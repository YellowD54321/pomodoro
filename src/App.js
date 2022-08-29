import React from "react";
import "./App.css";
import LoginPage from "./components/loginPage/LoginPage";
import AnalysisPage from "./components/analysisPage/AnalysisPage";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import ClockPage from "./components/clcokPage/ClockPage";

console.log("LAST UPDATE: 2022/08/30 12:14");

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div className="app-main">
          <NavBar />
          <Routes>
            <Route path="/" element={<ClockPage />}></Route>
            <Route path="/Analysis" element={<AnalysisPage />}></Route>
            <Route path="/Account" element={<LoginPage />}></Route>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
