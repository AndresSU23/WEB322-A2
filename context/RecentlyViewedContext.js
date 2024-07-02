import { createContext, useState } from 'react';

export const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, setRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};
