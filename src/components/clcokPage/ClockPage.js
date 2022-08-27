import React from "react";
import Button from "./button/Button";
import { RestDropList, WorkDropList } from "./dropList/DropList";
import { RestTimeCounter, WorkTimeCounter } from "./timeCounter/TimeCounter";
import WorkContent from "./workContent/WorkContent";

const ClockPage = () => {
  return (
    <div className="clcok-page-main">
      <div className="clock-page-counters">
        <div className="clock-page-work-counter">
          <WorkTimeCounter />
          <WorkDropList />
        </div>
        <div className="clock-page-rest-counter">
          <RestTimeCounter />
          <RestDropList />
        </div>
      </div>
      <WorkContent />
      <Button />
    </div>
  );
};

export default ClockPage;
