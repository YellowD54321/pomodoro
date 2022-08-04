import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClockStatus,
  clcokSetInitialWorkTime,
  clcokSetInitialRestTime,
} from "../features/clock/clockSlice";

const DropList = ({ labelText, children, setTime, defaultValue }) => {
  const dispatch = useDispatch();
  const isDisable = useSelector(
    (state) => state.clock.status !== ClockStatus.Idle
  );

  const onDropListSelect = (e) => {
    const initialTime = e.target.value;
    dispatch(setTime(initialTime));
  };

  return (
    <div className="drop-list-main">
      <label htmlFor="dropList">{labelText}</label>
      <select
        name="dropList"
        className="drop-list-selector"
        onChange={onDropListSelect}
        defaultValue={defaultValue}
        disabled={isDisable}
      >
        {children}
      </select>
    </div>
  );
};

export const WorkDropList = () => {
  const initialTime = useSelector((state) => state.clock.initialWorkTime);
  const labelText = "Working Time: ";
  let options = [];

  for (let i = 5; i <= 60; i += 5) {
    options.push(
      <option
        key={i}
        value={i} /* selected={initialTime === i && "selected"} */
      >
        {i} min
      </option>
    );
  }

  return (
    <DropList
      labelText={labelText}
      setTime={clcokSetInitialWorkTime}
      defaultValue={initialTime}
    >
      {options}
    </DropList>
  );
};

export const RestDropList = () => {
  const initialTime = useSelector((state) => state.clock.initialRestTime);
  const labelText = "Resting Time: ";
  let options = [];

  for (let i = 5; i <= 30; i += 5) {
    options.push(
      <option
        key={i}
        value={i} /* selected={initialTime === i && "selected"} */
      >
        {i} min
      </option>
    );
  }

  return (
    <DropList
      labelText={labelText}
      setTime={clcokSetInitialRestTime}
      defaultValue={initialTime}
    >
      {options}
    </DropList>
  );
};
