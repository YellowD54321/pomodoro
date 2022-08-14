import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clcokLastRecordEdited,
  ClockStatus,
} from "../features/clock/clockSlice";

const WorkContent = () => {
  const dispatch = useDispatch();
  const clockStatus = useSelector((state) => state.clock.status);
  const isReadOnly = clockStatus !== ClockStatus.Idle;
  const textRef = useRef(null);

  useEffect(() => {
    if (clockStatus === ClockStatus.Work) {
      const text = textRef.current?.value;
      dispatch(clcokLastRecordEdited({ workContent: text }));
    }
  }, [clockStatus]);

  return (
    <div>
      <input
        className="workContent-input"
        placeholder="I'm going to do..."
        ref={textRef}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default WorkContent;
