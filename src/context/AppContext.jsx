import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import SEED_DATA from '../data/transactions';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(SEED_DATA);
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

  // Stats
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense, count: transactions.length };
  }, [transactions]);

  // Searched + sorted transactions
  const filteredTxns = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let arr = transactions.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (!q) return true;
      return t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
    });

    arr.sort((a, b) => {
      let v = 0;
      if (sortKey === 'date') v = new Date(a.date) - new Date(b.date);
      else v = a.amount - b.amount;
      return sortDir === 'desc' ? -v : v;
    });
    return arr;
  }, [transactions, searchQuery, filterType, sortKey, sortDir]);

  // Category breakdown (expenses)
  const categoryBreakdown = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.cat] = (map[t.cat] || 0) + t.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  // Monthly data
  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { inc: 0, exp: 0 };
      if (t.type === 'income') map[m].inc += t.amount;
      else map[m].exp += t.amount;
    });
    const keys = Object.keys(map).sort();
    return { keys, data: map };
  }, [transactions]);

  // Sorting
  const handleSort = useCallback((field) => {
    setSortKey(prev => {
      if (prev === field) {
        setSortDir(d => d === 'desc' ? 'asc' : 'desc');
        return field;
      }
      setSortDir('desc');
      return field;
    });
  }, []);

  // CRUD
  const addTransaction = useCallback((tx) => {
    setTransactions(prev => [...prev, { ...tx, id: Date.now() }]);
  }, []);

  const editTransaction = useCallback((id, data) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  // Toast
  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, fading: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
    }, 2500);
  }, []);

  return (
    <AppContext.Provider value={{
      transactions, filteredTxns, stats,
      categoryBreakdown, monthlyData,
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
