import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clockStateSetToIdle,
  clockStateSetToWork,
  clockStateSetToNext,
  clockFinished,
  clcokLastRecordInitial,
  ClockStatus,
  // fetchRecords,
  addNewRecord,
} from "../features/clock/clockSlice";
// import { selectUserUid } from "../features/user/userSlice";

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
      console.log("lastRecord", lastRecord);
      dispatch(addNewRecord({ uid, lastRecord }));
    }
  };

  const handleClockStateSetToNext = () => {
    dispatch(clockStateSetToNext());
  };

  const onButtonClick = () => {
    initialLastRecord();
    handleClockFinished();

    // dispatch(fetchRecords(uid));

    handleClockStateSetToNext();
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
