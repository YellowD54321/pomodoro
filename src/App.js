import React from "react";
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
import AnalysisPage from "./components/analysisPage/AnalysisPage";

function App() {
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
