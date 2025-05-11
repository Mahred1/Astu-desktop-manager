// Format milliseconds to a human-readable time format (HH:MM:SS)
export const formatTime = (milliseconds) => {
  if (milliseconds <= 0) return '00:00:00';
  
  // Calculate hours, minutes, seconds
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  // Format with leading zeros
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};