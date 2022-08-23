import React, { useRef, useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import DoughnutChart from "./charts/DoughnutChart";
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
  getMonthStartAt,
  getYearStartAt,
  TimeFilters,
  selectTimeDurationName,
} from "../features/filter/filterSlice";

const AnalysisPage = () => {
  const records = useSelector(selectFilteredRecords);
  const timeFilter = useSelector(selectTimeDurationName);
  console.log("timeFilter", timeFilter);
  const result = {
    workTime: [],
    restTime: [],
    labels: [],
  };

  const getDayNextTime = (startTime, timeDistance) => {
    return startTime.setHours(startTime.getHours() + timeDistance * 6);
  };

  const getWeekNextTime = (startTime, timeDistance) => {
    return startTime.setDate(startTime.getDate() + timeDistance);
  };

  const getMonthNextTime = (startTime, timeDistance) => {
    return startTime.setDate(startTime.getDate() + timeDistance * 7);
  };

  const getYearNextTime = (startTime, timeDistance) => {
    return startTime.setDate(startTime.getDate() + timeDistance);
  };

  const getNexTime = (startTime, timeDistance) => {
    switch (timeFilter) {
      case TimeFilters.Day.name:
        return getDayNextTime(startTime, timeDistance);
      case TimeFilters.Week.name:
        return getWeekNextTime(startTime, timeDistance);
      case TimeFilters.Month.name:
        return getMonthNextTime(startTime, timeDistance);
      case TimeFilters.Year.name:
        return getYearNextTime(startTime, timeDistance);
      default:
        return getDayNextTime(startTime, timeDistance);
    }
  };

  const getSliceNumber = () => {
    switch (timeFilter) {
      case TimeFilters.Day.name:
        return 4;
      case TimeFilters.Week.name:
        return 7;
      case TimeFilters.Month.name:
        return 4;
      case TimeFilters.Year.name:
        return 12;
      default:
        return 4;
    }
  };

  const getFirstDayStartAt = () => {
    switch (timeFilter) {
      case TimeFilters.Day.name:
        return getDayStartAt();
      case TimeFilters.Week.name:
        return getWeekStartAt();
      case TimeFilters.Month.name:
        return getMonthStartAt();
      case TimeFilters.Year.name:
        return getYearStartAt();
      default:
        return getDayStartAt();
    }
  };

  const getLabels = (timeDistance) => {
    const dayLabels = ["Early Morning", "Morning", "Afternoon", "Night"];
    const weekLabels = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthLabels = [
      "First Week",
      "Second Week",
      "Third Week",
      "Fourth Week",
      "Fifth Week",
    ];
    const yearLabels = ["Season 1", "Season 2", "Season 3", "Season 4"];
    switch (timeFilter) {
      case TimeFilters.Day.name:
        return dayLabels[timeDistance];
      case TimeFilters.Week.name:
        return weekLabels[timeDistance];
      case TimeFilters.Month.name:
        return monthLabels[timeDistance];
      case TimeFilters.Year.name:
        return yearLabels[timeDistance];
      default:
        return "";
    }
  };

  const sliceNumber = getSliceNumber() - 1;

  for (let i = 0; i <= sliceNumber; i++) {
    const firstDayStartAt = new Date(getFirstDayStartAt());
    const firstDayEndAt = new Date(
      new Date(getFirstDayStartAt()).setHours("23", "59", "59", "999")
    );
    const startAt = new Date(getNexTime(firstDayStartAt, i)).toISOString();
    const endAt = new Date(getNexTime(firstDayEndAt, i)).toISOString();
    const dayRecords = records.filter(
      (record) => record.startTime >= startAt && record.startTime <= endAt
    );
    let totalWorkTime = 0;
    let totalRestTime = 0;
    dayRecords.forEach((record) => {
      totalWorkTime += record.workTime;
      totalRestTime += record.restTime;
    });
    result.labels.push(getLabels(i));
    result.workTime.push(totalWorkTime);
    result.restTime.push(totalRestTime);
  }

  const chartData = {
    labels: result.labels,
    data: result.workTime,
  };

  const chartOptions = {
    backgroundColor: [
      "#e7298a",
      "#e6ab02",
      "#fddd36",
      "#29b6a6",
      "#3380f2",
      "#9f21fd",
      "#8d4fc8",
    ],
  };

  return (
    <div className="analysis-page-main">
      <DoughnutChart chartData={chartData} chartOptions={chartOptions} />
    </div>
  );
};

export default AnalysisPage;
