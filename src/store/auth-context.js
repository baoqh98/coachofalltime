import React from 'react';
import { useState } from 'react';

export const AuthContext = React.createContext({
  token: '',
  userUID: '',
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});

// const initialToken = localStorage.getItem('football-token') || null;
// const initialUserUID = localStorage.getItem('football-UID') || null;

const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem('football-token') || null;
  const initialUserUID = localStorage.getItem('football-UID') || null;
  const [token, setToken] = useState(initialToken);
  const [userUID, setUserUID] = useState(initialUserUID);

  const isUserLoggedIn = !!token;

  const logOutHandler = () => {
    localStorage.removeItem('football-token');
    localStorage.removeItem('football-UID');
    setToken(null);
    setUserUID(null);
  };

  const logInHandler = (token, UID) => {
    localStorage.setItem('football-token', token);
    localStorage.setItem('football-UID', UID);
    setToken(token);
    setUserUID(UID);
  };

  const contextValue = {
    token,
    userUID,
    isLoggedIn: isUserLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
