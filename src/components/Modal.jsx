import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Modal({ isOpen, onClose, txn }) {
  const { addTransaction, editTransaction } = useApp();
  const [formData, setFormData] = useState({ date: '', desc: '', cat: 'Housing', type: 'expense', amount: '' });

  useEffect(() => {
    if (isOpen) {
      if (txn) {
        setFormData({
          date: txn.date,
          desc: txn.desc || txn.description,
          cat: txn.cat || txn.category,
          type: txn.type,
          amount: String(txn.amount)
        });
      } else {
        const today = new Date().toISOString().slice(0, 10);
        setFormData({ date: today, desc: '', cat: 'Food', type: 'expense', amount: '' });
      }
    }
  }, [isOpen, txn]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.desc || !formData.amount) return;
    const amnt = parseFloat(formData.amount);
    if (isNaN(amnt)) return;

    if (txn) {
      editTransaction({ ...txn, ...formData, amount: amnt });
    } else {
      addTransaction({ ...formData, amount: amnt });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-[200] flex items-center justify-center w-[100vw] h-[100vh] p-4">
      <div className="bg-bg2 border border-border2 rounded-2xl p-7 w-full max-w-[460px] animate-scaleIn relative max-h-[90vh] overflow-y-auto">
        <h2 className="font-display text-[1.1rem] font-[700] mb-5 flex items-center justify-between">
          {txn ? 'Edit Transaction' : 'New Transaction'}
          <button className="bg-bg3 border border-border1 rounded-md text-text2 w-[26px] h-[26px] flex items-center justify-center cursor-pointer transition-colors duration-200 outline-none hover:border-red hover:text-red" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="mb-[14px]">
              <label className="font-mono text-[0.65rem] text-text3 tracking-wider uppercase block mb-1.5">Date</label>
              <input type="date" className="w-full bg-bg3 border border-border1 rounded-lg text-textMain py-2 px-3 font-sans text-[0.85rem] outline-none transition-colors duration-200 focus:border-accent" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="mb-[14px]">
              <label className="font-mono text-[0.65rem] text-text3 tracking-wider uppercase block mb-1.5">Type</label>
              <select className="w-full bg-bg3 border border-border1 rounded-lg text-textMain py-2 px-3 font-sans text-[0.85rem] outline-none transition-colors duration-200 focus:border-accent" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          
          <div className="mb-[14px]">
            <label className="font-mono text-[0.65rem] text-text3 tracking-wider uppercase block mb-1.5">Description</label>
            <input type="text" className="w-full bg-bg3 border border-border1 rounded-lg text-textMain py-2 px-3 font-sans text-[0.85rem] outline-none transition-colors duration-200 focus:border-accent" placeholder="e.g. Grocery Shopping" required value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="mb-[14px]">
              <label className="font-mono text-[0.65rem] text-text3 tracking-wider uppercase block mb-1.5">Category</label>
              <select className="w-full bg-bg3 border border-border1 rounded-lg text-textMain py-2 px-3 font-sans text-[0.85rem] outline-none transition-colors duration-200 focus:border-accent" value={formData.cat} onChange={e => setFormData({ ...formData, cat: e.target.value })}>
                <option value="Food">Food & Dining</option>
                <option value="Housing">Housing & Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Shopping">Shopping</option>
                <option value="Salary">Salary / Income</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-[14px]">
              <label className="font-mono text-[0.65rem] text-text3 tracking-wider uppercase block mb-1.5">Amount</label>
              <input type="number" step="0.01" className="w-full bg-bg3 border border-border1 rounded-lg text-textMain py-2 px-3 font-sans text-[0.85rem] outline-none transition-colors duration-200 focus:border-accent" placeholder="0.00" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
            </div>
          </div>

          <div className="flex gap-2.5 justify-end mt-5 pt-4 border-t border-border1">
            <button type="button" className="btn-base bg-bg3 border border-border1 text-text2 hover:border-border2 hover:text-textMain" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-base bg-accent text-bg font-semibold hover:bg-[#6ee79f] hover:-translate-y-[1px]">{txn ? 'Save Changes' : 'Save Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
