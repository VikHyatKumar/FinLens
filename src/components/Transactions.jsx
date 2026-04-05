import { useApp } from '../context/AppContext';

function fmt(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
}

export default function Transactions({ onEdit }) {
  const { filteredTxns, role, searchQuery, setSearchQuery, filterType, setFilterType, handleSort, sortKey, sortDir, deleteTransaction } = useApp();

  return (
    <div id="panel-transactions" className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            className="w-full bg-bg2 border border-border1 rounded-lg text-textMain py-2 pl-8 pr-2.5 font-sans text-[0.82rem] outline-none transition-colors duration-200 focus:border-accent placeholder:text-text3" 
            placeholder="Search transactions…" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="bg-bg2 border border-border1 rounded-lg text-textMain py-2 px-3 font-sans text-[0.82rem] outline-none cursor-pointer transition-colors duration-200 focus:border-accent"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="bg-bg2 border border-border1 rounded-xl overflow-x-auto animate-fadeUp" style={{ animationDelay: '0.3s' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border1">
              <th onClick={() => handleSort('date')} className={`font-mono text-[0.62rem] text-text3 tracking-[1.5px] uppercase py-3 px-4 text-left cursor-pointer select-none whitespace-nowrap transition-colors hover:text-text2 ${sortKey === 'date' ? '[&>span]:opacity-100 [&>span]:text-accent' : ''}`}>
                Date <span className="ml-1 opacity-40">{sortKey === 'date' && sortDir === 'asc' ? '↑' : '↓'}</span>
              </th>
              <th className="font-mono text-[0.62rem] text-text3 tracking-[1.5px] uppercase py-3 px-4 text-left cursor-pointer select-none whitespace-nowrap transition-colors hover:text-text2">Description</th>
              <th className="font-mono text-[0.62rem] text-text3 tracking-[1.5px] uppercase py-3 px-4 text-left cursor-pointer select-none whitespace-nowrap transition-colors hover:text-text2">Category</th>
              <th className="font-mono text-[0.62rem] text-text3 tracking-[1.5px] uppercase py-3 px-4 text-center cursor-pointer select-none whitespace-nowrap transition-colors hover:text-text2">Type</th>
              <th onClick={() => handleSort('amount')} className={`font-mono text-[0.62rem] text-text3 tracking-[1.5px] uppercase py-3 px-4 text-right cursor-pointer select-none whitespace-nowrap transition-colors hover:text-text2 ${sortKey === 'amount' ? '[&>span]:opacity-100 [&>span]:text-accent' : ''}`}>
                Amount <span className="ml-1 opacity-40">{sortKey === 'amount' && sortDir === 'asc' ? '↑' : '↓'}</span>
              </th>
              {role === 'admin' && <th className="font-mono text-[0.62rem] text-text3 tracking-[1.5px] uppercase py-3 px-4 text-center cursor-pointer select-none whitespace-nowrap transition-colors hover:text-text2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTxns.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} className="py-[11px] px-4">
                  <div className="flex flex-col items-center justify-center p-12 text-text3 gap-2.5 text-center">
                    <svg className="opacity-30 w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
                    <p className="text-[0.82rem]">No transactions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTxns.map(t => (
                <tr key={t.id} className="border-b border-border1 transition-colors duration-150 cursor-pointer hover:bg-bg3 last:border-b-0">
                  <td className="py-[11px] px-4 font-mono text-[0.72rem] text-text3 whitespace-nowrap">{new Date(t.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                  <td className="py-[11px] px-4 text-[0.83rem] text-textMain font-normal">{t.desc || t.description}</td>
                  <td className="py-[11px] px-4"><span className="inline-block py-0.5 px-[7px] rounded text-[0.62rem] tracking-wider uppercase font-mono bg-bg4 text-text2 border border-border1">{t.cat || t.category}</span></td>
                  <td className="py-[11px] px-4 text-center">
                    <span className={`inline-flex items-center gap-1 py-0.5 px-2 rounded font-mono text-[0.62rem] tracking-wider uppercase ${t.type === 'income' ? 'bg-accent/10 text-accent' : 'bg-red/10 text-red'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-[11px] px-4 font-mono text-[0.85rem] font-medium text-right ${t.type === 'income' ? 'text-accent' : 'text-red'}`}>
                    {t.type === 'expense' ? '-' : '+'} {fmt(t.amount)}
                  </td>
                  {role === 'admin' && (
                    <td className="py-[11px] px-4 text-center whitespace-nowrap">
                      <button className="bg-transparent border border-border1 rounded-[5px] text-text3 py-[3px] px-2 text-[0.72rem] cursor-pointer transition-colors font-sans hover:border-accent hover:text-accent" onClick={(e) => { e.stopPropagation(); onEdit(t); }}>Edit</button>
                      <button className="bg-transparent border border-border1 rounded-[5px] text-text3 py-[3px] px-2 text-[0.72rem] cursor-pointer transition-colors font-sans hover:border-red hover:text-red ml-1" onClick={(e) => { e.stopPropagation(); if(window.confirm('Delete transaction?')) deleteTransaction(t.id); }}>Del</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
