import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2  items-center">
            <img src="astu_logo.svg" width={40} alt="" />
              
            <h1 className="text-xl md:text-2xl font-bold text-white">ASTU Desktop Pooling System</h1>
          </div>
          <div className="text-white text-sm md:text-base">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
