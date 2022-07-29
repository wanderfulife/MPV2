import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (!error) {
      return;
    } else {
      alert(error);
    }
  }, [error]);

  const logout = () => {
    signOut(auth).catch((error) => setError(error));
  };

  const signUpWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) =>
      setError(error)
    );
  };

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setError(error)
    );
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signInWithEmail,
      signUpWithEmail,
      logout
    }),
    [user]
  );

  return (
    <AuthContext.Provider
      value={memoedValue}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
