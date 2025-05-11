import React from 'react';
import ComputerCard from './ComputerCard';
import { useComputers } from '../contexts/ComputerContext';

const ComputerGrid = ({ onComputerClick, statusFilter }) => {
  const { computers } = useComputers();

  const filteredComputers = computers.filter(computer => {
    if (statusFilter === 'all') return true;
    return computer.status === statusFilter;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredComputers.map(computer => (
        <ComputerCard
          key={computer.id}
          computer={computer}
          onClick={onComputerClick}
        />
      ))}
      {filteredComputers.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500">
          No computers match the selected filter.
        </div>
      )}
    </div>
  );
};

export default ComputerGrid;