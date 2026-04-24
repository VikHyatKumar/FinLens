import { useApp } from '../context/AppContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { CAT_COLORS } from '../data/transactions';

const balIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>;
const upIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>;
const downIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>;
const listIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;

function fmt(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
}
function fmtShort(n) {
  if (Math.abs(n) >= 10000000) return '₹' + (n / 10000000).toFixed(1) + 'Cr';
  if (Math.abs(n) >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
  if (Math.abs(n) >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
  return '₹' + n.toFixed(0);
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg4 border border-border1 p-2.5 rounded text-[10px] font-mono">
      <p className="text-text2 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || entry.fill }}>
          {entry.name}: {fmt(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { stats, categoryBreakdown, monthlyData } = useApp();

  const cards = [
    { label: 'Net Balance', value: stats.balance, icon: balIcon, colorClass: 'card-green', iconClass: 'bg-accent/10 text-accent' },
    { label: 'Total Income', value: stats.income, icon: upIcon, colorClass: 'card-cyan', iconClass: 'bg-accent2/10 text-accent2' },
    { label: 'Total Expenses', value: stats.expense, icon: downIcon, colorClass: 'card-red', iconClass: 'bg-red/10 text-red' },
    { label: 'Transactions', value: stats.count, icon: listIcon, colorClass: 'card-amber', iconClass: 'bg-accent3/10 text-accent3', isCount: true },
  ];

  let running = 0;
  const chartData = monthlyData.keys.map(m => {
    running += monthlyData.data[m].inc - monthlyData.data[m].exp;
    return { name: m, Balance: parseFloat(running.toFixed(2)), Income: parseFloat(monthlyData.data[m].inc.toFixed(2)) };
  });

  const totalSpent = categoryBreakdown.reduce((s, c) => s + c[1], 0);

  return (
    <div id="panel-overview" className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className={`bg-bg2 border border-border1 rounded-xl py-4 px-5 relative overflow-hidden transition-all duration-200 hover:border-border2 hover:-translate-y-0.5 animate-fadeUp ${c.colorClass}`} style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="card-glow-overlay"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[0.65rem] text-text3 tracking-[1.5px] uppercase">{c.label}</div>
              <div className={`w-7 h-7 rounded-[7px] flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5 ${c.iconClass}`}>{c.icon}</div>
            </div>
            <div className="font-display text-[1.6rem] font-[700] text-textMain leading-none mb-2 tracking-tight">{c.isCount ? c.value : fmt(c.value)}</div>
            <div className="text-[0.75rem] text-text3 mt-1">Current period</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div className="bg-bg2 border border-border1 rounded-xl p-5 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <div>
              <div className="font-display font-[600] text-[0.95rem] text-textMain">Balance Trend</div>
              <div className="font-mono text-[0.62rem] text-text3 mt-0.5 tracking-wider uppercase">Running balance over time</div>
            </div>
            <div className="flex gap-3 font-mono text-[0.65rem]">
              <span className="flex items-center gap-1.5 text-text3">
                <span className="w-3 h-0.5 rounded-[1px] bg-accent inline-block"></span>Balance
              </span>
              <span className="flex items-center gap-1.5 text-text3">
                <span className="w-3 h-0.5 rounded-[1px] bg-blue inline-block"></span>Income
              </span>
            </div>
          </div>
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.1)" />
                <XAxis dataKey="name" tick={{ fill: '#4f5f73', fontSize: 10, fontFamily: "'DM Mono', monospace" }} axisLine={{ stroke: 'rgba(156,163,175,0.1)' }} tickLine={false} />
                <YAxis tick={{ fill: '#4f5f73', fontSize: 10, fontFamily: "'DM Mono', monospace" }} tickFormatter={fmtShort} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Balance" stroke="#4ade80" strokeWidth={2} fillOpacity={1} fill="url(#colorBal)" activeDot={{ r: 5 }} dot={{ r: 3, fill: '#4ade80' }} />
                <Area type="monotone" dataKey="Income" stroke="#6366f1" strokeWidth={1.5} fillOpacity={0} strokeDasharray="4 4" dot={{ r: 2, fill: '#6366f1' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-bg2 border border-border1 rounded-xl p-5 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display font-[600] text-[0.95rem] text-textMain">Spending Breakdown</div>
              <div className="font-mono text-[0.62rem] text-text3 mt-0.5 tracking-wider uppercase">By category</div>
            </div>
          </div>
          <div className="relative h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown.map(e => ({ name: e[0], value: e[1] }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CAT_COLORS[index % CAT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <div className="font-display text-[1.3rem] font-[700] text-textMain">{fmtShort(totalSpent)}</div>
              <div className="font-mono text-[0.6rem] text-text3 tracking-wider uppercase">Total Spent</div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            {categoryBreakdown.slice(0, 5).map((e, i) => (
              <div key={e[0]} className="flex items-center justify-between text-[0.78rem]">
                <div className="flex items-center gap-1.5 text-text2">
                  <div className="w-2 h-2 rounded-[2px] shrink-0" style={{ background: CAT_COLORS[i % CAT_COLORS.length] }}></div>
                  {e[0]}
                </div>
                <div className="font-mono text-textMain text-[0.75rem]">{fmt(e[1])}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
