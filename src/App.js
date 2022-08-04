import logo from "./logo.svg";
import "./App.css";
import {
  RestTimeCounter,
  WorkTimeCounter,
} from "./components/timeCounter/TimeCounter";
import Button from "./components/button/Button";
import { RestDropList, WorkDropList } from "./components/dropList/DropList";
import Record from "./components/record/Record";

function App() {
  return (
    <div className="App">
      <WorkTimeCounter />
      <RestTimeCounter />
      <WorkDropList />
      <RestDropList />
      <Button />
      <Record />
    </div>
  );
}

export default App;
