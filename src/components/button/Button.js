import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clockStateSetToIdle,
  clockStateSetToWork,
  clockStateSetToNext,
  clockFinished,
  clcokLastRecordAdded,
  ClockStatus,
} from "../features/clock/clockSlice";

const Button = () => {
  const dispatch = useDispatch();
  const clockStatus = useSelector((state) => state.clock.status);

  const initialLastRecord = () => {
    if (clockStatus === ClockStatus.Idle) {
      dispatch(clcokLastRecordAdded());
    }
  };

  const handleClockFinished = () => {
    if (clockStatus === ClockStatus.Rest) {
      dispatch(clockFinished());
    }
  };

  const onButtonClick = () => {
    initialLastRecord();
    handleClockFinished();
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
