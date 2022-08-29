import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { ClockStatus } from "../features/clock/clockSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.uid);
  const loginText = isLogin ? "Account" : "Sign In";
  const clockStatus = useSelector((state) => state.clock.status);
  const isClockRunning = clockStatus !== ClockStatus.Idle;
  const disableClassName = isClockRunning ? " nav-bar-disable" : "";
  const clockRef = useRef();
  const analysisRef = useRef();
  const accountRef = useRef();

  const clockPage = clockRef.current;
  const analysisPage = analysisRef.current;
  const accountPage = accountRef.current;

  let clockPageClassName = "nav-bar-clock";
  let analysisPageClassName = "nav-bar-analysis";
  let accountPageClassName = "nav-bar-account";

  const NavBarChosenClassName = "nav-bar-chosen";

  const PageName = {
    Clock: "/",
    Analysis: "/Analysis",
    Account: "/Account",
  };

  const currentPageName = window.location.hash.slice(1);

  const clearChosenClass = () => {
    if (clockPage && analysisPage && accountPage) {
      clockPage.classList.remove(NavBarChosenClassName);
      analysisPage.classList.remove(NavBarChosenClassName);
      accountPage.classList.remove(NavBarChosenClassName);
    }
  };

  const addChosenClass = (target) => {
    if (target) {
      target.classList.add(NavBarChosenClassName);
    }
  };

  const handleClockClick = () => {
    navigate("/");
  };
  const handleAnalysisClick = () => {
    if (isClockRunning) return;
    navigate("/Analysis");
  };
  const handleAccountClick = () => {
    if (isClockRunning) return;
    navigate("/Account");
  };

  clearChosenClass();
  switch (currentPageName) {
    case PageName.Clock:
      clockPageClassName += " " + NavBarChosenClassName;
      addChosenClass(clockPage);
      break;
    case PageName.Analysis:
      analysisPageClassName += " " + NavBarChosenClassName;
      addChosenClass(analysisPage);
      break;
    case PageName.Account:
      accountPageClassName += " " + NavBarChosenClassName;
      addChosenClass(accountPage);
      break;
    default:
      clockPageClassName += " " + NavBarChosenClassName;
      addChosenClass(clockPage);
      break;
  }

  return (
    <div id="nav-bar-main">
      <nav>
        <ul>
          <li
            onClick={handleClockClick}
            ref={clockRef}
            className={clockPageClassName}
          >
            Clock
          </li>
          <li
            onClick={handleAnalysisClick}
            ref={analysisRef}
            className={analysisPageClassName + disableClassName}
          >
            Analysis
          </li>
          <li
            onClick={handleAccountClick}
            ref={accountRef}
            className={accountPageClassName + disableClassName}
          >
            {loginText}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
