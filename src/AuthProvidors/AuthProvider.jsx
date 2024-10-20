import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "./FireBase/FirebaseConfig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxiosSecure from "../Hooks/useAxiosSecure";



export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Dark Mode Implement 
  const toggleDarkMode = () => {
    return setDarkMode(!darkMode);
  }

  // log In With Google 
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider)
  }
  // log In With Email And Password 
  const logInWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // log out 
  const logOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error.message)
      })

  };
  // Create User 
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // User State Change 
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const userLoggedIn = { email: userEmail };

      if (currentUser) {
        setUser(currentUser);
        axiosSecure.post('/jwt', userLoggedIn)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err.message);
          });
      } else {
        axiosSecure.post('/logout', userLoggedIn)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err.message);
          });
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, [user?.email, axiosSecure]);

  const authInfo = {
    user,
    loading,
    logInWithGoogle,
    logInWithEmailAndPassword,
    createUser,
    logOut,
    toggleDarkMode,
    darkMode,
    setLoading,

  }
  return (
    <AuthContext.Provider value={authInfo}>
      {
        children
      }
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider;