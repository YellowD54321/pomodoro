import React from "react";
import { useSelector } from "react-redux";

const Record = () => {
  const recordContent = useSelector((state) => state.clock.record);
  console.log(recordContent);
  return (
    <div>
      <p>Work Time: {recordContent.workTIme}</p>
      <p>Rest Time: {recordContent.restTIme}</p>
    </div>
  );
};

export default Record;
