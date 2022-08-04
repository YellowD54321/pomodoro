import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clockStateSetToIdle,
  clockStateSetToWork,
  clockStateSetToNext,
  ClockStatus,
} from "../features/clock/clockSlice";

const Button = () => {
  const dispatch = useDispatch();
  const clockStatus = useSelector((state) => state.clock.status);

  const onButtonClick = () => {
    console.log("Button is clicked.");
    dispatch(clockStateSetToNext());
  };

  return (
    <div className="button-main">
      <button type="button" className="button" onClick={onButtonClick}>
        START
      </button>
    </div>
  );
};

export default Button;
