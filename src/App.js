import React, { useEffect } from "react";
import "./App.css";
import {
  RestTimeCounter,
  WorkTimeCounter,
} from "./components/timeCounter/TimeCounter";
import Button from "./components/button/Button";
import { RestDropList, WorkDropList } from "./components/dropList/DropList";
import Record from "./components/record/Record";
import WorkContent from "./components/workContent/WorkContent";
import LoginPage from "./components/loginPage/LoginPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSetAuthenticationType,
  accountSetEmail,
  accountSetUid,
  AuthType,
} from "./components/features/user/userSlice";
import AnalysisPage from "./components/analysisPage/AnalysisPage";
import { fetchRecords } from "./components/features/clock/clockSlice";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(accountSetAuthenticationType(AuthType.Google));
        dispatch(accountSetEmail(user.email));
        dispatch(accountSetUid(user.uid));
        dispatch(fetchRecords(user.uid));
      }
    });
  }, [auth, dispatch]);

  return (
    <div className="App">
      <WorkTimeCounter />
      <RestTimeCounter />
      <WorkDropList />
      <RestDropList />
      <WorkContent />
      <Button />
      <LoginPage />
      <Record />
      <AnalysisPage />
    </div>
  );
}

export default App;
