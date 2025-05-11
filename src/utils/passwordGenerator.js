// Function to generate a secure random temporary password
export const generatePassword = () => {
  // Character sets for password generation
  const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excluding O, I which can be confused
  const lowercaseChars = 'abcdefghijkmnpqrstuvwxyz'; // Excluding l, o which can be confused
  const numberChars = '23456789'; // Excluding 0, 1 which can be confused
  const specialChars = '@#$%&*!?';
  
  // Length requirements
  const uppercaseLength = 2;
  const lowercaseLength = 3;
  const numberLength = 2;
  const specialLength = 1;
  
  let password = '';
  
  // Add required uppercase characters
  for (let i = 0; i < uppercaseLength; i++) {
    const randomIndex = Math.floor(Math.random() * uppercaseChars.length);
    password += uppercaseChars.charAt(randomIndex);
  }
  
  // Add required lowercase characters
  for (let i = 0; i < lowercaseLength; i++) {
    const randomIndex = Math.floor(Math.random() * lowercaseChars.length);
    password += lowercaseChars.charAt(randomIndex);
  }
  
  // Add required numbers
  for (let i = 0; i < numberLength; i++) {
    const randomIndex = Math.floor(Math.random() * numberChars.length);
    password += numberChars.charAt(randomIndex);
  }
  
  // Add required special characters
  for (let i = 0; i < specialLength; i++) {
    const randomIndex = Math.floor(Math.random() * specialChars.length);
    password += specialChars.charAt(randomIndex);
  }
  
  // Shuffle the password (Fisher-Yates algorithm)
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }
  
  return passwordArray.join('');
};