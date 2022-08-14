import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSetEmail,
  accountSetUid,
  authenticationType,
  accountSetAuthenticationType,
  AuthType,
} from "../features/user/userSlice";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import SignOutButton from "./SignOutButton";
import { fetchRecords } from "../features/clock/clockSlice";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.user.uid);

  const initialUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const docRef = await getDoc(userRef);
      const userData = docRef.data();
      if (userData?.pomodoroRecord) return;
      await setDoc(userRef, {
        email: user.email,
        pomodoroRecord: [{ startTime: 0 }],
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
        if (user) {
          dispatch(accountSetAuthenticationType(AuthType.Google));
          dispatch(accountSetEmail(user.email));
          dispatch(accountSetUid(user.uid));
          dispatch(fetchRecords(user.uid));
          initialUser(user);
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
    <div className="loginPage-main">
      <button
        type="button"
        className="loginPage-google-button"
        onClick={onSignInGoogleClick}
        style={{ display: !isUserLogin ? "block" : "none" }}
      >
        Sign in with Google
      </button>
      <SignOutButton />
    </div>
  );
};

export default LoginPage;
