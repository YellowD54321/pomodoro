import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ClockStatus,
  clcokLastRecordEdited,
} from "../../features/clock/clockSlice";

const TimeCounter = ({ initialTime, counting, recordTime }) => {
  const [countValue, setCountValue] = useState(initialTime);
  const clockStatus = useSelector((state) => state.clock.status);
  const timerRef = useRef(null);

  useEffect(() => {
    if (clockStatus === ClockStatus.Idle) {
      setCountValue(initialTime);
    }
  }, [clockStatus, initialTime, recordTime, countValue]);

  useEffect(() => {
    if (!counting) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setCountValue((preValue) => {
          const nextValue = preValue - 1;
          return nextValue;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [counting]);

  useEffect(() => {
    if (counting) recordTime(initialTime - countValue);
  }, [countValue, counting, recordTime, initialTime]);

  const minutesDisplay = Math.abs(Math.trunc(countValue / 60))
    .toString()
    .padStart(2, "0");
  const secondsDiplay = Math.abs(countValue % 60)
    .toString()
    .padStart(2, "0");
  const negativeMark = countValue < 0 ? "-" : "";

  return (
    <div className="timeCounter-main">
      {negativeMark} {minutesDisplay} : {secondsDiplay}
    </div>
  );
};

export const WorkTimeCounter = () => {
  const clockStatus = useSelector((state) => state.clock.status);
  const initialTime = useSelector((state) => state.clock.initialWorkTime);
  const counting = clockStatus === ClockStatus.Work;
  const dispatch = useDispatch();

  const recordTime = (timeValue) => {
    dispatch(
      clcokLastRecordEdited({
        initialWorkTime: initialTime,
        workTime: timeValue,
      })
    );
  };

  return (
    <div className="timeCounter-workTimeCounter">
      <TimeCounter
        initialTime={initialTime}
        counting={counting}
        recordTime={recordTime}
      />
    </div>
  );
};

export const RestTimeCounter = () => {
  const clockStatus = useSelector((state) => state.clock.status);
  const initialTime = useSelector((state) => state.clock.initialRestTime);
  const counting = clockStatus === ClockStatus.Rest;
  const dispatch = useDispatch();

  const recordTime = (timeValue) => {
    dispatch(
      clcokLastRecordEdited({
        initialRestTime: initialTime,
        restTime: timeValue,
      })
    );
  };

  return (
    <div className="timeCounter-restTimeCounter">
      <TimeCounter
        initialTime={initialTime}
        counting={counting}
        recordTime={recordTime}
      />
    </div>
  );
};
