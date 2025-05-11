import React from 'react';

const StatusFilter = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="inline-flex bg-white border border-gray-300 rounded-md overflow-hidden">
      <button
        className={`px-4 py-2 text-sm ${statusFilter === 'all' ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setStatusFilter('all')}
      >
        All
      </button>
      <button
        className={`px-4 py-2 text-sm ${statusFilter === 'available' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setStatusFilter('available')}
      >
        Available
      </button>
      <button
        className={`px-4 py-2 text-sm ${statusFilter === 'in-use' ? 'bg-amber-100 text-amber-800 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setStatusFilter('in-use')}
      >
        In Use
      </button>
    </div>
  );
};

export default StatusFilter;