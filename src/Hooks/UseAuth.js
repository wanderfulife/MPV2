import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "@firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in..
          setUser(user);
        } else {
          // Not logged in..
          setUser(null);
        }
      }),
    []
  );

  const logout = () => {
    signOut(auth).catch((error) => setError(error));
    console.log('signed out');
  };

  const signInWithEmail = (email, password) => {
     createUserWithEmailAndPassword(auth, email, password).catch((error) =>
      setError(error)
    );
  };

  const logInWithEmail = (email, password) => { 
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setError(error)
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmail,
        logInWithEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
