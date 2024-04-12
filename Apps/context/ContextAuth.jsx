import * as SecureStore from "expo-secure-store";
import {
  collection,
  getDocs,
  where,
  query,
  getFirestore,
  updateDoc,
  doc
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../../firebaseConfig";

const TOKEN = "auth_token";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const db = getFirestore(app);

  const [auth, setAuth] = useState({
    token: null,
    authState: null,
  });

  const [user, setUser] = useState({
    userName: null,
    userEmail: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN);
      console.log("ContextAuth.jsx ~ line 30  ~ tokensFound -: " + token);
      if (token) {
        console.log("ContextAuth.jsx ~ line 32  ~ tokenfound");

        const q = query(collection(db, "Users"), where("token", "==", token));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => doc.data());

        setAuth({
          token: token,
          authState: true,
        });
        setUser({
            userName:items[0].userName,
            userEmail:items[0].email

        })
      }
    };
    loadToken();
  }, []);

  const register = async (email, password) => {
    try {
      //some code logic to register

      setAuth({
        token: Date.now(),
        authState: true,
      });

      await SecureStore.setItemAsync(TOKEN, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const q = query(collection(db, "Users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => doc.data());
      console.log(items);
      if (items.length > 0) {
        if (items[0].password != password) {
          return false;
        }
        const tokenVal = Date.now().toString();
        setAuth({
          token: tokenVal,
          authState: true,
        }),
          setUser({
            userName: items[0].userName,
            userEmail: items[0].email,
          });

        try {
          const docRef = doc(db, "Users", querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            token: tokenVal, // Update any fields you want here
          }).then((resp) => {
            console.log("document token updated with response : " + resp);
          });
        } catch (error) {
          console.log(error);
        }
        await SecureStore.setItemAsync(TOKEN, tokenVal);
        console.log("ContextAuth.jsx ~ line 78  ~ tokenset");
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      //some code logic to register
      await SecureStore.deleteItemAsync(TOKEN);
      setAuth({
        token: null,
        authState: false,
      });
      setUser({
        userName: null,
        userEmail: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    auth,
    user,
  };

  // auth :{
  //     token : auth.token,
  //     setAuth : setAuth
  // }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
