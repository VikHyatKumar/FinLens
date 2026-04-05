import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const { currentTab, setCurrentTab, role, setRole, transactions, toast } = useApp();

  const navItems = [
    { key: 'overview', label: 'Overview', icon: <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { key: 'transactions', label: 'Transactions', badge: transactions.length, icon: <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg> },
    { key: 'insights', label: 'Insights', icon: <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  ];

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    toast(`Switched to ${newRole} role`, newRole === 'admin' ? 'success' : 'info');
  };

  return (
    <aside className="w-[56px] min-w-[56px] lg:w-[220px] md:w-[220px] lg:min-w-[220px] bg-bg2 border-r border-border1 flex flex-col py-6 sticky top-0 h-screen z-[100] transition-[width] duration-300">
      <div className="px-5 pb-7 border-b border-border1 mb-4 hidden md:block">
        <div className="font-display font-[800] text-[1.4rem] text-textMain tracking-tight">Fin<span className="text-accent">Lens</span></div>
        <div className="font-mono text-[0.65rem] text-text3 tracking-widest uppercase mt-0.5">Finance OS</div>
      </div>

      <div className="px-3 mb-2">
        <div className="font-mono text-[0.6rem] text-text3 tracking-widest uppercase py-2 px-2 hidden md:block">Main</div>
        {navItems.map(({ key, label, icon, badge }) => (
          <div
            key={key}
            className={`flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg cursor-pointer text-[0.85rem] font-normal transition-all duration-150 mb-0.5 border border-transparent hover:bg-bg3 hover:text-textMain max-md:justify-center ${currentTab === key ? 'bg-bg3 text-accent border-border1' : 'text-text2'}`}
            onClick={() => setCurrentTab(key)}
            id={`nav-${key}`}
          >
            <span className="w-4 h-4 shrink-0">{icon}</span>
            <span className="hidden md:inline">{label}</span>
            {badge !== undefined && <span className="ml-auto font-mono text-[0.6rem] bg-accent text-bg px-1.5 py-[1px] rounded-[3px] font-medium hidden md:inline">{badge}</span>}
          </div>
        ))}
      </div>

      <div className="mt-auto px-3 pt-4 border-t border-border1">
        <div className="bg-bg3 border border-border1 rounded-[10px] p-3 hidden md:block">
          <div className="font-mono text-[0.6rem] text-text3 tracking-widest uppercase mb-2">Active Role</div>
          <select className="w-full bg-bg4 border border-border2 rounded-md text-textMain py-1.5 px-2 font-sans text-[0.8rem] cursor-pointer outline-none transition-colors focus:border-accent" value={role} onChange={handleRoleChange} id="role-select">
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2 py-[3px] rounded font-mono text-[0.65rem] uppercase tracking-wider ${role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-blue/10 text-blue'}`} id="role-badge">
            <span className="w-[5px] h-[5px] rounded-full bg-current" />
            <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
