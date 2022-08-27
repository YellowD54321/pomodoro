import React, { useRef } from "react";
import { useSelector } from "react-redux/es/exports";
import { ClockStatus } from "../features/clock/clockSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.uid);
  const loginText = isLogin ? "Account" : "Sign In";
  const clockStatus = useSelector((state) => state.clock.status);
  const isClockRunning = clockStatus !== ClockStatus.Idle;
  const disableClassName = isClockRunning ? "nav-bar-disable" : "";
  const clockRef = useRef();
  const analysisRef = useRef();
  const accountRef = useRef();

  const clockPage = clockRef.current;
  const analysisPage = analysisRef.current;
  const accountPage = accountRef.current;

  const clearChosenClass = () => {
    if (clockPage && analysisPage && accountPage) {
      clockPage.classList.remove("nav-bar-chosen");
      analysisPage.classList.remove("nav-bar-chosen");
      accountPage.classList.remove("nav-bar-chosen");
    }
  };

  const addChosenClass = (target) => {
    if (target) {
      target.classList.add("nav-bar-chosen");
    }
  };

  const handleClockClick = () => {
    clearChosenClass();
    addChosenClass(clockPage);
    navigate("/");
  };
  const handleAnalysisClick = () => {
    if (isClockRunning) return;
    clearChosenClass();
    addChosenClass(analysisPage);
    navigate("/Analysis");
  };
  const handleAccountClick = () => {
    if (isClockRunning) return;
    clearChosenClass();
    addChosenClass(accountPage);
    navigate("/Account");
  };

  return (
    <div id="nav-bar-main">
      <nav>
        <ul>
          <li
            onClick={handleClockClick}
            ref={clockRef}
            className="nav-bar-clock nav-bar-chosen"
          >
            Clock
          </li>
          <li
            onClick={handleAnalysisClick}
            ref={analysisRef}
            className={"nav-bar-analysis " + disableClassName}
          >
            Analysis
          </li>
          <li
            className={"nav-bar-account " + disableClassName}
            onClick={handleAccountClick}
            ref={accountRef}
          >
            {loginText}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
