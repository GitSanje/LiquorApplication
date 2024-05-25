import React, { createContext, useContext } from 'react';

const RemoveOrderContext = createContext(null);

export const useRemoveOrder = () => useContext(RemoveOrderContext);

export const RemoveOrderProvider = ({ children, removeOrder }) => (
  <RemoveOrderContext.Provider value={removeOrder}>
    {children}
  </RemoveOrderContext.Provider>
);
