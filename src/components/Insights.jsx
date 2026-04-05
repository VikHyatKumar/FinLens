import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CAT_COLORS } from '../data/transactions';

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

export default function Insights() {
  const { stats, categoryBreakdown, monthlyData } = useApp();

  const totalExp = stats.expense;
  const totalInc = stats.income;
  const topCat = categoryBreakdown[0] || ['—', 0];
  const savingsRate = totalInc > 0 ? ((totalInc - totalExp) / totalInc * 100).toFixed(1) : 0;
  const months = monthlyData.keys.length || 1;
  const avgMonthlyExp = totalExp / months;
  const catEntries = categoryBreakdown.slice(0, 4);
  const maxVal = catEntries[0] ? catEntries[0][1] : 1;

  const chartData = monthlyData.keys.map(k => ({
    name: k,
    Income: monthlyData.data[k].inc,
    Expenses: monthlyData.data[k].exp
  }));

  return (
    <div id="panel-insights" className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-bg2 border border-border1 rounded-xl py-[18px] px-5 animate-fadeUp" style={{ animationDelay: '0.05s' }}>
          <div className="font-mono text-[0.6rem] text-text3 tracking-widest uppercase mb-2.5 flex items-center gap-1.5" style={{ '--tag-color': 'var(--red)' }}><span className="insight-tag-dot"></span>Top Spending</div>
          <div className="font-display text-[0.95rem] font-semibold text-textMain mb-2">Highest Spend Category</div>
          <div className="text-[0.8rem] text-text2 leading-relaxed">Your biggest expense category is <strong className="text-textMain">{topCat[0]}</strong>, accounting for {totalExp > 0 ? (topCat[1] / totalExp * 100).toFixed(1) : 0}% of total spend.</div>
          <span className="font-display text-[1.4rem] font-bold text-textMain mt-2.5 block">{fmt(topCat[1])}</span>
          <div className="h-1 rounded-sm bg-bg4 mt-2 overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-700 ease-in-out" style={{ backgroundColor: 'var(--red)', width: `${totalExp > 0 ? topCat[1] / totalExp * 100 : 0}%` }}></div></div>
        </div>
        <div className="bg-bg2 border border-border1 rounded-xl py-[18px] px-5 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <div className="font-mono text-[0.6rem] text-text3 tracking-widest uppercase mb-2.5 flex items-center gap-1.5" style={{ '--tag-color': 'var(--accent)' }}><span className="insight-tag-dot"></span>Savings</div>
          <div className="font-display text-[0.95rem] font-semibold text-textMain mb-2">Savings Rate</div>
          <div className="text-[0.8rem] text-text2 leading-relaxed">You're saving <strong className="text-textMain">{savingsRate}%</strong> of your income. {parseFloat(savingsRate) >= 20 ? 'Excellent! You\'re above the 20% benchmark.' : 'Try to aim for 20%+ savings.'}</div>
          <span className="font-display text-[1.4rem] font-bold text-textMain mt-2.5 block">{savingsRate}%</span>
          <div className="h-1 rounded-sm bg-bg4 mt-2 overflow-hidden"><div className="h-full rounded-sm bg-accent transition-[width] duration-700 ease-in-out" style={{ width: `${Math.min(savingsRate, 100)}%` }}></div></div>
        </div>
        <div className="bg-bg2 border border-border1 rounded-xl py-[18px] px-5 animate-fadeUp" style={{ animationDelay: '0.15s' }}>
          <div className="font-mono text-[0.6rem] text-text3 tracking-widest uppercase mb-2.5 flex items-center gap-1.5" style={{ '--tag-color': 'var(--accent3)' }}><span className="insight-tag-dot"></span>Monthly</div>
          <div className="font-display text-[0.95rem] font-semibold text-textMain mb-2">Avg Monthly Expense</div>
          <div className="text-[0.8rem] text-text2 leading-relaxed">You spend an average of <strong className="text-textMain">{fmt(avgMonthlyExp)}</strong> per month across {months} month{months !== 1 ? 's' : ''}.</div>
          <span className="font-display text-[1.4rem] font-bold text-textMain mt-2.5 block">{fmt(avgMonthlyExp)}</span>
          <div className="h-1 rounded-sm bg-bg4 mt-2 overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-700 ease-in-out" style={{ backgroundColor: 'var(--accent3)', width: '75%' }}></div></div>
        </div>
        {catEntries.map((e, i) => (
          <div className="bg-bg2 border border-border1 rounded-xl py-[18px] px-5 animate-fadeUp" key={e[0]}>
            <div className="font-mono text-[0.6rem] text-text3 tracking-widest uppercase mb-2.5 flex items-center gap-1.5" style={{ '--tag-color': CAT_COLORS[i] }}><span className="insight-tag-dot"></span>#{i + 1} Category</div>
            <div className="font-display text-[0.95rem] font-semibold text-textMain mb-2">{e[0]}</div>
            <div className="text-[0.8rem] text-text2 leading-relaxed">{(e[1] / totalExp * 100).toFixed(1)}% of total expenses. {e[1] > 500 ? 'High spend — review if needed.' : 'Looks reasonable.'}</div>
            <span className="font-display text-[1.4rem] font-bold text-textMain mt-2.5 block">{fmt(e[1])}</span>
            <div className="h-1 rounded-sm bg-bg4 mt-2 overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-700 ease-in-out" style={{ backgroundColor: CAT_COLORS[i], width: `${(e[1] / maxVal * 100)}%` }}></div></div>
          </div>
        ))}
      </div>
      <div className="bg-bg2 border border-border1 rounded-xl p-5 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-display font-[600] text-[0.95rem] text-textMain">Monthly Comparison</div>
            <div className="font-mono text-[0.62rem] text-text3 mt-0.5 tracking-wider uppercase">Income vs Expenses per month</div>
          </div>
        </div>
        <div className="relative h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.1)" />
              <XAxis dataKey="name" tick={{ fill: '#4f5f73', fontSize: 10, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#4f5f73', fontSize: 10, fontFamily: "'DM Mono', monospace" }} tickFormatter={fmtShort} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px', fontFamily: "'DM Mono', monospace", color: '#8b96a8' }} iconType="circle" iconSize={10} />
              <Bar dataKey="Income" fill="rgba(74,222,128,.7)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Expenses" fill="rgba(248,113,113,.7)" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
