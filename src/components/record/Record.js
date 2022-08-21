import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredRecordIds } from "../features/clock/clockSlice";

const Record = () => {
  const records = useSelector((state) => state.clock.record);
  // const recordIds = useSelector(selectFilteredRecordIds());
  let recordContent = null;

  // console.log("recordIds", recordIds);

  if (!records) return;

  if (records.length === 0) {
    recordContent = (
      <div className="record-recordContent">
        <p>Work Time: </p>
        <p>Rest Time: </p>
        <p>Work Content: </p>
      </div>
    );
  } else {
    recordContent = records.map((record, index) => {
      return (
        <div className="record-recordContent" key={index}>
          <p>Work Time: {record.workTime}</p>
          <p>Rest Time: {record.restTime}</p>
          <p>Work Content: {record.workContent}</p>
        </div>
      );
    });
  }

  return <div>{recordContent}</div>;
};

export default Record;
