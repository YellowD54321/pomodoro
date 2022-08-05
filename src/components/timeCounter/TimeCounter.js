import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClockStatus, clcokRecordAdded } from "../features/clock/clockSlice";

const TimeCounter = ({ initialTime, counting, recordTime }) => {
  const [countValue, setCountValue] = useState(initialTime);
  const clockStatus = useSelector((state) => state.clock.status);
  const timerRef = useRef(null);

  useEffect(() => {
    if (clockStatus === ClockStatus.Idle) {
      recordTime(countValue);
      setCountValue(initialTime);
    }
  }, [clockStatus, initialTime]);

  useEffect(() => {
    if (!counting) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setCountValue((preValue) => preValue - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [counting]);

  return <div>{countValue}</div>;
};

export const WorkTimeCounter = () => {
  const clockStatus = useSelector((state) => state.clock.status);
  const initialTime = useSelector((state) => state.clock.initialWorkTime);
  const counting = clockStatus === ClockStatus.Work;
  const dispatch = useDispatch();

  const recordTime = (timeValue) => {
    dispatch(
      clcokRecordAdded({
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
      clcokRecordAdded({
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
