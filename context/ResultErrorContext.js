import { createContext, useState } from 'react';

export const ResultErrorContext = createContext();

export const ResultErrorProvider = ({ children }) => {
  const [error, setError] = useState('');

  return (
    <ResultErrorContext.Provider value={{ error, setError }}>
      {children}
    </ResultErrorContext.Provider>
  );
};
