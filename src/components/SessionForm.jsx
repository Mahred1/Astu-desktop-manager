import React, { useState } from 'react';
import { useComputers } from '../contexts/ComputerContext';
import { generatePassword } from '../utils/passwordGenerator';

const SessionForm = ({ computer, onClose }) => {
  const { startSession } = useComputers();
  const [studentId, setStudentId] = useState('');
  const [duration, setDuration] = useState(60); // Default: 60 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
    if (error) setError('');
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const validateForm = () => {
    const regex = /^Ugr\/\d{5}\/\d{2}$/;
    if (!regex.test(studentId)) {
      setError('Student ID must be in the format "Ugr/12345/12"');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const generatedPassword = generatePassword();
    setPassword(generatedPassword);
    
    startSession(computer.id, {
      studentId,
      duration: duration * 60 * 1000, // Convert to milliseconds
      startTime: Date.now(),
      password: generatedPassword
    });
    
    setIsSubmitted(true);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleModalClick}>
      <div className="modal-content">
        {!isSubmitted ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Assign Computer #{computer.id}
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="studentId">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={handleStudentIdChange}
                  className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="Ugr/30846/15"
                  required
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="duration">
                  Duration (minutes)
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={handleDurationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                </select>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-colors"
                >
                  Start Session
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Session Started
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Session started successfully for student {studentId}.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Temporary Login Details</h4>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Username:</span> 
                  <span className="ml-2 text-gray-800">{studentId}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Password:</span> 
                  <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">{password}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                This credential is valid only for the duration of the session ({duration} minutes).
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionForm;