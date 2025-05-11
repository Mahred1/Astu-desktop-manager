import { useState } from 'react';
import Header from './components/Header';
import ComputerGrid from './components/ComputerGrid';
import SessionForm from './components/SessionForm';
import { ComputerProvider } from './contexts/ComputerContext';
import StatusFilter from './components/StatusFilter';

function App() {
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleComputerClick = (computer) => {
    setSelectedComputer(computer);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <ComputerProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Computer Pool</h2>
            <StatusFilter 
              statusFilter={statusFilter} 
              setStatusFilter={setStatusFilter} 
            />
          </div>
          <ComputerGrid 
            onComputerClick={handleComputerClick}
            statusFilter={statusFilter}
          />
          {isFormOpen && (
            <SessionForm 
              computer={selectedComputer} 
              onClose={handleCloseForm}
            />
          )}
        </main>
      </div>
    </ComputerProvider>
  );
}

export default App;