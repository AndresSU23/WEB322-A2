import { createContext, useState } from 'react';

export const IdSearchErrorContext = createContext();

export const IdSearchErrorProvider = ({ children }) => {
  const [idError, setIdError] = useState('');

  return (
    <IdSearchErrorContext.Provider value={{ idError, setIdError }}>
      {children}
    </IdSearchErrorContext.Provider>
  );
};
