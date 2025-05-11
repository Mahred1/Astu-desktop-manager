import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ComputerContext = createContext();

const generateInitialComputers = () => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    status: 'available',
    session: null
  }));
};

export const ComputerProvider = ({ children }) => {
  const getInitialComputers = () => {
    try {
      const savedComputers = localStorage.getItem('computers');
      return savedComputers ? JSON.parse(savedComputers) : generateInitialComputers();
    } catch (error) {
      console.error('Error loading computers from localStorage:', error);
      return generateInitialComputers();
    }
  };

  const [computers, setComputers] = useState(getInitialComputers);

  useEffect(() => {
    try {
      localStorage.setItem('computers', JSON.stringify(computers));
    } catch (error) {
      console.error('Error saving computers to localStorage:', error);
    }
  }, [computers]);

  const startSession = (computerId, sessionData) => {
    setComputers(prevComputers =>
      prevComputers.map(computer => 
        computer.id === computerId
          ? {
              ...computer,
              status: 'in-use',
              session: {
                id: uuidv4(),
                ...sessionData
              }
            }
          : computer
      )
    );
  };

  const terminateSession = (computerId) => {
    setComputers(prevComputers =>
      prevComputers.map(computer => 
        computer.id === computerId
          ? {
              ...computer,
              status: 'available',
              session: null
            }
          : computer
      )
    );
  };

  const resetAllComputers = () => {
    setComputers(generateInitialComputers());
  };

  const value = {
    computers,
    startSession,
    terminateSession,
    resetAllComputers
  };

  return (
    <ComputerContext.Provider value={value}>
      {children}
    </ComputerContext.Provider>
  );
};

export const useComputers = () => {
  const context = useContext(ComputerContext);
  if (!context) {
    throw new Error('useComputers must be used within a ComputerProvider');
  }
  return context;
};