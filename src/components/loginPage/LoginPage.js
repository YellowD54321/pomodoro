import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  accountSetEmail,
  accountSetUid,
  authenticationType,
  authenticationTypeSetToGoogle,
} from "../features/user/userSlice";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();

  const initialUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        pomodoroRecord: [],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSignInGoogleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(token);
        console.log(user);
        if (user) {
          dispatch(authenticationTypeSetToGoogle());
          dispatch(accountSetEmail(user.email));
          dispatch(accountSetUid(user.uid));
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };
  return (
    <div>
      <button
        type="button"
        className="loginPage-google-button"
        onClick={onSignInGoogleClick}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
