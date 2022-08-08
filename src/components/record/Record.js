import React from "react";
import { useSelector } from "react-redux";

const Record = () => {
  const records = useSelector((state) =>
    state.clock.records.filter((record) => record.id !== -1)
  );
  console.log(records);
  let recordContent = null;

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
