import { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = () => {
      const storageUser = localStorage.getItem("SystemUser");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    };
    loadStorage();
  }, []);

  const signUp = async (name, email, passwoard) => {
    setLoadingAuth(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwoard)
      .then(async value => {
        let uid = value.user.uid;
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            nome: name,
            avatarUrl: null,
          })
          .then(() => {
            let data = {
              uid: value.user.uid,
              name,
              email: value.user.email,
              avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          })
          .catch(error => {
            console.log(error);
            setLoadingAuth(false);
          });
      });
  };

  const signIn = async (email, passwoard) => {
    setLoadingAuth(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, passwoard)
      .then(async value => {
        let uid = value.user.uid;
        const userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let data = {
          name: userProfile.data().nome,
          email: userProfile.data().email,
          avatarUrl: userProfile.data().avatarUrl,
        };
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
      .catch(error => {
        console.log(error);
        setLoadingAuth(false);
      });
  };

  const storageUser = data => {
    localStorage.setItem("SystemUser", JSON.stringify(data));
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    localStorage.removeItem("SystemUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        signIn,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
