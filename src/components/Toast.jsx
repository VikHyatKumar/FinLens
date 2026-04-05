import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
      {toasts.map((t) => {
        let dotColor = 'bg-accent2';
        if (t.type === 'success') dotColor = 'bg-accent';
        if (t.type === 'error') dotColor = 'bg-red';

        return (
          <div key={t.id} className={`bg-bg3 border border-border2 rounded-[10px] py-3 px-4 text-[0.82rem] text-textMain flex items-center gap-2.5 max-w-[300px] shadow-lg ${t.exiting ? 'animate-slideOut' : 'animate-slideIn'} shadow-black/40`}>
            <div className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`}></div>
            {t.msg}
          </div>
        );
      })}
    </div>
  );
}
