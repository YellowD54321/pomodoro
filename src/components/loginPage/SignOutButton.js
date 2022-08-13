import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSetEmail,
  accountSetUid,
  accountSetAuthenticationType,
} from "../features/user/userSlice";

const SignOutButton = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.user.uid);

  const onSignOutClick = () => {
    signOut(auth)
      .then(() => {
        dispatch(accountSetAuthenticationType(""));
        dispatch(accountSetEmail(""));
        dispatch(accountSetUid(""));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="loginPage-log-out-button"
        onClick={onSignOutClick}
        style={{ display: isUserLogin ? "block" : "none" }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
