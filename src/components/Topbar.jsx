import { useApp } from '../context/AppContext';
import { Sun, Moon } from 'lucide-react';

export default function Topbar({ onOpenModal }) {
  const { currentTab, role, theme, setTheme } = useApp();

  const TITLES = {
    overview: 'Dashboard Overview',
    transactions: 'Transactions',
    insights: 'Insights'
  };
  const PATHS = {
    overview: 'FINLENS / OVERVIEW',
    transactions: 'FINLENS / TRANSACTIONS',
    insights: 'FINLENS / INSIGHTS'
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 border-b border-border1 bg-bg2 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div>
          <div className="font-display font-[700] text-[1.1rem] text-textMain">{TITLES[currentTab]}</div>
          <div className="font-mono text-[0.65rem] text-text3 tracking-wider">{PATHS[currentTab]}</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button 
          className="btn-base bg-bg3 border border-border1 text-text2 hover:border-border2 hover:text-textMain rounded-full p-1.5" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {role === 'admin' && (
          <button className="btn-base bg-accent text-bg font-semibold hover:bg-[#6ee79f] hover:-translate-y-[1px]" id="add-txn-btn" onClick={() => onOpenModal()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add
          </button>
        )}
      </div>
    </header>
  );
}
