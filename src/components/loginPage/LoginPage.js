import React, { useState, useEffect } from "react";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSetEmail,
  accountSetUid,
  accountSetAuthenticationType,
  AuthType,
} from "../features/user/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import SignOutButton from "./SignOutButton";
import { fetchRecords } from "../features/clock/clockSlice";
import Avatar from "./avatar/Avatar";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.user.uid);
  const { email, authenticationType } = useSelector((state) => state.user);
  const [googleImageSrc, setGoogleImageSrc] = useState(
    "./images/google/btn_google_signin_light_normal_web@2x.png"
  );

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

  const onGoogleClick = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
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
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };

  const onGoogleMouseDown = () => {
    setGoogleImageSrc(
      "./images/google/btn_google_signin_light_pressed_web@2x.png"
    );
  };

  useEffect(() => {
    const mouseUpEvent = () => {
      setGoogleImageSrc(
        "./images/google/btn_google_signin_light_normal_web@2x.png"
      );
    };
    window.addEventListener("mouseup", mouseUpEvent);
    return () => {
      window.removeEventListener("mouseup", mouseUpEvent);
    };
  }, []);

  return (
    <div className="login-page-main">
      <img
        src={googleImageSrc}
        alt=""
        className="login-page-google-button"
        onClick={onGoogleClick}
        onMouseDown={onGoogleMouseDown}
        style={{ display: !isUserLogin ? "block" : "none" }}
        draggable="false"
      />
      <div
        className="login-page-account-information"
        style={{ display: isUserLogin ? "block" : "none" }}
      >
        Account: {email} ({authenticationType})
      </div>
      <Avatar />
      <SignOutButton />
    </div>
  );
};

export default LoginPage;
