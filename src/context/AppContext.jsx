import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

const AppContext = createContext();

const API = 'http://localhost:5000/api';

// Map backend document shape → frontend shape
const normalize = (t) => ({
  id: t._id,
  date: (t.date || '').slice(0, 10),
  desc: t.description || '',
  cat: t.category,
  type: t.type,
  amount: t.amount,
});

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0, count: 0 });
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [monthlyData, setMonthlyData] = useState({ keys: [], data: {} });
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState('admin');
  const [currentTab, setCurrentTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, fading: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
    }, 2500);
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [txRes, sumRes, insRes] = await Promise.all([
        fetch(`${API}/transactions`),
        fetch(`${API}/summary`),
        fetch(`${API}/insights`),
      ]);
      const [txJson, sumJson, insJson] = await Promise.all([
        txRes.json(), sumRes.json(), insRes.json(),
      ]);

      const txList = txJson.data.map(normalize);
      setTransactions(txList);

      setStats({
        income: sumJson.data.totalIncome,
        expense: sumJson.data.totalExpenses,
        balance: sumJson.data.netBalance,
        count: txList.length,
      });

      // [{ category, total }]  →  [[category, total], ...]
      setCategoryBreakdown(insJson.data.categoryBreakdown.map(e => [e.category, e.total]));

      // [{ year, month, income, expense }]  →  { keys, data }
      const dataMap = {};
      const keys = insJson.data.monthlyTrend.map(({ year, month, income, expense }) => {
        const key = `${year}-${String(month).padStart(2, '0')}`;
        dataMap[key] = { inc: income, exp: expense };
        return key;
      });
      setMonthlyData({ keys, data: dataMap });
    } catch {
      toast('Failed to load data. Is the server running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // UI-level filter + sort — stays in frontend (no aggregation logic, pure display)
  const filteredTxns = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let arr = transactions.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (!q) return true;
      return t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
    });
    arr.sort((a, b) => {
      const v = sortKey === 'date'
        ? new Date(a.date) - new Date(b.date)
        : a.amount - b.amount;
      return sortDir === 'desc' ? -v : v;
    });
    return arr;
  }, [transactions, searchQuery, filterType, sortKey, sortDir]);

  const handleSort = useCallback((field) => {
    setSortKey(prev => {
      if (prev === field) { setSortDir(d => d === 'desc' ? 'asc' : 'desc'); return field; }
      setSortDir('desc');
      return field;
    });
  }, []);

  // CRUD — each mutation calls the API then re-fetches all derived data
  const addTransaction = useCallback(async (tx) => {
    try {
      const res = await fetch(`${API}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: tx.amount, type: tx.type, category: tx.cat, date: tx.date, description: tx.desc }),
      });
      const json = await res.json();
      if (!res.ok) { toast(json.error || 'Failed to add transaction', 'error'); return; }
      await fetchAll();
      toast('Transaction added', 'success');
    } catch {
      toast('Failed to add transaction', 'error');
    }
  }, [fetchAll, toast]);

  const editTransaction = useCallback(async (tx) => {
    try {
      const res = await fetch(`${API}/transactions/${tx.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: tx.amount, type: tx.type, category: tx.cat, date: tx.date, description: tx.desc }),
      });
      const json = await res.json();
      if (!res.ok) { toast(json.error || 'Failed to update transaction', 'error'); return; }
      await fetchAll();
      toast('Transaction updated', 'success');
    } catch {
      toast('Failed to update transaction', 'error');
    }
  }, [fetchAll, toast]);

  const deleteTransaction = useCallback(async (id) => {
    try {
      const res = await fetch(`${API}/transactions/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) { toast(json.error || 'Failed to delete transaction', 'error'); return; }
      await fetchAll();
      toast('Transaction deleted', 'info');
    } catch {
      toast('Failed to delete transaction', 'error');
    }
  }, [fetchAll, toast]);

  return (
    <AppContext.Provider value={{
      transactions, filteredTxns, stats,
      categoryBreakdown, monthlyData,
      loading,
      role, setRole,
      currentTab, setCurrentTab,
      searchQuery, setSearchQuery,
      filterType, setFilterType,
      sortKey, sortDir, handleSort,
      addTransaction, editTransaction, deleteTransaction,
      toasts, toast,
      theme, setTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
