import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import initializeAuthentication from "../Firebase/firebase.init";
import axios from "axios";

//initialize firebase

initializeAuthentication();

//provider

const useFirebase = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  googleProvider.addScope("email");

  const auth = getAuth();

  // console.log(user);

  // clear error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  useEffect(() => {
    setIsAdmin(false);
    axios
      .get(
        `https://whispering-hamlet-71993.herokuapp.com/isAdmin?userEmail=${user.email}`
      )
      .then(async (res) => {
        await setIsAdmin(res.data.isAdmin);
      });
  }, [user.email]);

  //google sign in button

  const handleSignInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //github sign in button

  const handleSignInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //Email sign in

  const signInWithEmail = () => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //set name and profile image url
  const setNameImage = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  //verify email

  const emailVerify = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      alert(`An Verification mail has been sent to ${email}`);
    });
  };

  //Get the currently signed in user and observe user state change

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }, []);

  //signUp means create new user with email and pass
  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setNameImage();
        emailVerify();
        alert("User has been created");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //sign out

  const logOut = () => {
    // setIsLoading(true);
    signOut(auth)
      .then((result) => {
        setUser({});
      })

      .finally(() => setLoading(false));
    // .catch((error) => {
    //     setError(error.message);
    //   });
  };

  //reset password

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email has been sent");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //get email

  const getEmail = (e) => {
    setEmail(e?.target?.value);
  };

  //get password

  const getPassword = (e) => {
    setPassword(e?.target?.value);
  };

  //get Name

  const getName = (e) => {
    setName(e?.target?.value);
  };

  //get photoURL
  const getPhoto = (e) => {
    setPhoto(e?.target?.value);
  };

  return {
    getEmail,
    getPassword,
    signInWithEmail,
    handleSignInWithGoogle,
    handleSignInWithGithub,
    logOut,
    signUp,
    getName,
    getPhoto,
    resetPassword,
    setNameImage,
    setLoading,
    setError,
    setUser,
    isAdmin,
    setIsAdmin,
    user,
    error,
    loading,
  };
};
export default useFirebase;
