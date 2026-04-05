import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import Modal from './components/Modal';
import Toast from './components/Toast';
function AppContent() {
  const { currentTab } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);

  const openModalForAdd = () => {
    setEditingTxn(null);
    setModalOpen(true);
  };

  const openModalForEdit = (txn) => {
    setEditingTxn(txn);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen" id="app">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onOpenModal={openModalForAdd} />
        <div className="flex-1 flex flex-col gap-6 p-4 sm:p-6 lg:p-6 xl:px-7 xl:py-6">
          {currentTab === 'overview' && <Dashboard />}
          {currentTab === 'transactions' && <Transactions onEdit={openModalForEdit} />}
          {currentTab === 'insights' && <Insights />}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} txn={editingTxn} />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
