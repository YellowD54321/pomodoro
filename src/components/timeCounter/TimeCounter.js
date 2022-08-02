import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ClockStatus } from "../features/clock/clockSlice";

const TimeCounter = () => {
  const [countValue, setCountValue] = useState(0);
  const timerRef = useRef(null);
  const stateStatus = useSelector((state) => state.clock.status);

  //   useEffect(() => {
  //     timerRef.current = setInterval(() => {
  //       setCountValue((preValue) => preValue + 1);
  //     }, 1000);
  //     return () => {
  //       clearInterval(timerRef.current);
  //     };
  //   }, []);

  useEffect(() => {
    console.log(stateStatus);
    if (stateStatus === ClockStatus.Idle) {
      console.log("STOP COUNTING");
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setCountValue((preValue) => preValue + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [stateStatus]);

  return <div>{countValue}</div>;
};

export const WorkTimeCounter = () => {
  return (
    <div className="timeCounter-workTimeCounter">
      <TimeCounter />
    </div>
  );
};
