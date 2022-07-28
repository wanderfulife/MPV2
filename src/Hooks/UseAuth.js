import React, { createContext, useContext } from "react";
import { auth } from "../../firebase";


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  



  const handleLogin = (email, password) => {
  
}



  return (
    <AuthContext.Provider value={{
      user: null
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
