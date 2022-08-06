import logo from "./logo.svg";
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
    </div>
  );
}

export default App;
