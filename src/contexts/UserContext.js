import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(
    {
      username: "",
      type: "",
    }
  );

  const handleUserOnChange = (
    username,
    type
  ) => {
    setUser(
      {
        username: username,
        type: type,
      });
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
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={handleUserOnChange}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}