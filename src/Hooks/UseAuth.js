import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const onSubmit = async (email,password) => {
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("pwd", password);
      signInWithEmail(email, password);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const mail = await AsyncStorage.getItem("email");
        const pwd = await AsyncStorage.getItem("pwd");
        if (mail !== null && pwd !== null) {
          signInWithEmail(mail, pwd);
        }
      } catch (error) {
        alert(error);
      }
    };
    getData();
  }, []);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in..
          setUser(user);
          setLoadingInitial(false);
        } else {
          // Not logged in..
          setUser(null);
          setTimeout(() => {
          setLoadingInitial(false);
            
          }, 1100);
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
    AsyncStorage.clear();
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
      signUpWithEmail,
      signInWithEmail,
      logout,
      onSubmit
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
