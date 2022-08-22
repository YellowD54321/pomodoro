import React, { useRef, useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import "./analysisPage.css";
import { useSelector } from "react-redux";
import {
  selectFilteredRecords,
  selectFilteredRecordIds,
  selectRecordById,
} from "../features/clock/clockSlice";

import {
  getDayStartAt,
  getWeekStartAt,
  getWeekEndAt,
} from "../features/filter/filterSlice";

const AnalysisPage = () => {
  const records = useSelector(selectFilteredRecords);
  const result = {
    workTime: [],
    restTime: [],
    labels: [],
  };

  for (let i = 0; i <= 6; i++) {
    const firstDayStartAt = new Date(getWeekStartAt());
    const firstDayEndAt = new Date(
      new Date(firstDayStartAt).setHours("23", "59", "59", "999")
    );
    const startAt = new Date(
      firstDayStartAt.setDate(firstDayStartAt.getDate() + i)
    ).toISOString();
    const endAt = new Date(
      firstDayEndAt.setDate(firstDayEndAt.getDate() + i)
    ).toISOString();
    const dayRecords = records.filter(
      (record) => record.startTime >= startAt && record.startTime <= endAt
    );
    let dayWorkTime = 0;
    let dayRestTime = 0;
    dayRecords.forEach((record) => {
      dayWorkTime += record.workTime;
      dayRestTime += record.restTime;
    });
    result.labels.push(`day ${i}`);
    result.workTime.push(dayWorkTime);
    result.restTime.push(dayRestTime);
  }

  const chartData = {
    labels: result.labels,
    label: ["Week"],
    data: result.workTime,
  };

  return (
    <div className="analysis-page-main">
      <BarChart chartData={chartData} />
    </div>
  );
};

export default AnalysisPage;
