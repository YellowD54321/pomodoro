import logo from "./logo.svg";
import "./App.css";
import { WorkTimeCounter } from "./components/timeCounter/TimeCounter";
import Button from "./components/button/Button";

function App() {
  return (
    <div className="App">
      <WorkTimeCounter />
      <Button />
    </div>
  );
}

export default App;
