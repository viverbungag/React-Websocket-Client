import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';

const DataContext = createContext();
const DataUpdateContext = createContext();

const reducer = (data, store) => {
  const newData = data;
  data[store.type] = store.newValue
  return newData;
}

export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(reducer,{});

  const handleDataOnChange = (
    type,
    newValue
  ) => {
    dispatch(type, newValue);
  }

  useEffect(() => {
    // const fetchUser = () => {
    //   setUser({
    //     username: localStorage.getItem('username'),
    //     type: localStorage.getItem('type')
    //   })

    // };

    // fetchUser();
  }, []);

  return (
    <DataContext.Provider value={data}>
      <DataUpdateContext.Provider value={handleDataOnChange}>
        {children}
      </DataUpdateContext.Provider>
    </DataContext.Provider>
  );
}

export function useUser() {
  return useContext(DataContext);
}

export function useUserUpdate() {
  return useContext(DataUpdateContext);
}