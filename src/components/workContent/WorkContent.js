import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clcokLastRecordEdited,
  ClockStatus,
} from "../features/clock/clockSlice";

const WorkContent = () => {
  const textRef = useRef();
  const dispatch = useDispatch();
  const isReadOnly = useSelector(
    (state) => state.clock.status !== ClockStatus.Idle
  );

  useEffect(() => {
    const text = textRef.current?.value;
    dispatch(clcokLastRecordEdited({ workContent: text }));
  }, [isReadOnly]);

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
