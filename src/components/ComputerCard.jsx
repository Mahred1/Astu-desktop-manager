import React from 'react';
import SessionTimer from './SessionTimer';
import { useComputers } from '../contexts/ComputerContext';

const ComputerCard = ({ computer, onClick }) => {
  const { terminateSession } = useComputers();
  const { id, status, session } = computer;

  const handleClick = (e) => {
    if (status === 'available' && !e.target.closest('button')) {
      onClick(computer);
    }
  };

  const handleStartSession = (e) => {
    e.stopPropagation();
    onClick(computer);
  };

  const handleTerminate = (e) => {
    e.stopPropagation();
    terminateSession(id);
  };

  const getStatusColors = () => {
    if (status === 'available') {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">ASTU-PC-{String(id).padStart(3, '0')}</h3>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColors()}`}>
            {status === 'available' ? 'Available' : 'In Use'}
          </span>
        </div>
        
        {status === 'in-use' && session && (
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <div className="mb-2">
                <span className="font-medium">Student ID:</span> {session.studentId}
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200 flex items-center gap-1.5">
                <span className="font-medium">Password:</span>
                <div className=" w-fit font-mono mt-1 bg-white px-2 py-1 rounded text-gray-800 border border-gray-300">
                  {session.password}
                </div>
              </div>
            </div>
            
            <SessionTimer 
              startTime={session.startTime}
              duration={session.duration} 
              computerId={id}
            />
            
            <button
              onClick={handleTerminate}
              className="w-full py-2 px-3 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
            >
              Terminate Session
            </button>
          </div>
        )}
        
        {status === 'available' && (
          <div className="mt-4">
            <button
              onClick={handleStartSession}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded transition-colors"
            >
              Start Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComputerCard;