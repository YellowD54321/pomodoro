import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clockStateSetToNext,
  clcokLastRecordEdited,
  clcokLastRecordInitial,
  ClockStatus,
  addNewRecord,
} from "../features/clock/clockSlice";

const Button = () => {
  const dispatch = useDispatch();
  const clockStatus = useSelector((state) => state.clock.status);
  const uid = useSelector((state) => state.user.uid);
  const lastRecord = useSelector((state) => state.clock.lastRecord);

  const initialLastRecord = () => {
    if (clockStatus === ClockStatus.Idle) {
      dispatch(clcokLastRecordInitial());
    }
  };

  const handleClockFinished = () => {
    if (clockStatus === ClockStatus.Rest) {
      dispatch(addNewRecord({ uid, lastRecord }));
    }
  };

  const handleClockStateSetToNext = () => {
    dispatch(clockStateSetToNext());
  };

  const onButtonClick = () => {
    initialLastRecord();
    handleClockFinished();
    handleClockStateSetToNext();
  };

  const setButtonText = () => {
    switch (clockStatus) {
      case ClockStatus.Idle:
        return "WORK";
      case ClockStatus.Work:
        return "REST";
      case ClockStatus.Rest:
        return "STOP";
      default:
        return "WORK";
    }
  };

  const buttonText = setButtonText();

  return (
    <div className="button-main">
      <button type="button" className="button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
