import React, { useState, useEffect } from 'react';
import { useComputers } from '../contexts/ComputerContext';
import { formatTime } from '../utils/timeUtils';

const SessionTimer = ({ startTime, duration, computerId }) => {
  const { terminateSession } = useComputers();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [progress, setProgress] = useState(100);

  function calculateTimeLeft() {
    const elapsed = Date.now() - startTime;
    return Math.max(0, duration - elapsed);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Calculate progress percentage
      const progressValue = (newTimeLeft / duration) * 100;
      setProgress(progressValue);
      
      // Auto-terminate when time is up
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        terminateSession(computerId);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [computerId, duration, startTime, terminateSession]);

  // Calculate color based on time left
  const getProgressColor = () => {
    if (progress > 60) return 'bg-green-500';
    if (progress > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="session-timer">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Time Remaining:</span>
        <span className="font-medium">{formatTime(timeLeft)}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ease-linear ${getProgressColor()}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SessionTimer;