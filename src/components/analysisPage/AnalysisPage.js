import React, { useRef, useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import DoughnutChart from "./charts/DoughnutChart";
import "./analysisPage.css";
import { useSelector, useDispatch } from "react-redux";
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
  timeFilterChanged,
} from "../features/filter/filterSlice";

const AnalysisPage = () => {
  const dispatch = useDispatch();
  const records = useSelector(selectFilteredRecords);
  const timeFilter = useSelector(selectTimeDurationName);
  const result = {
    workTime: [],
    restTime: [],
    labels: [],
  };

  const getDayNextTime = (startTime, timeDistance) => {
    return new Date(
      startTime.setHours(startTime.getHours() + timeDistance * 6)
    );
  };

  const getWeekNextTime = (startTime, timeDistance) => {
    return new Date(startTime.setDate(startTime.getDate() + timeDistance));
  };

  const getMonthNextTime = (startTime, timeDistance) => {
    return new Date(startTime.setDate(startTime.getDate() + timeDistance * 7));
  };

  const getYearNextTime = (startTime, timeDistance) => {
    const isEndTime = startTime.getHours() !== 0;
    return new Date(
      startTime.getFullYear(),
      isEndTime
        ? startTime.getMonth() + 3 * timeDistance + 1
        : startTime.getMonth() + 3 * timeDistance,
      isEndTime ? 0 : startTime.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
      startTime.getSeconds(),
      startTime.getMilliseconds()
    );
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
        return 5;
      case TimeFilters.Year.name:
        return 4;
      default:
        return 4;
    }
  };

  const getFirstDayStartAt = () => {
    switch (timeFilter) {
      case TimeFilters.Day.name:
        return new Date(getDayStartAt());
      case TimeFilters.Week.name:
        return new Date(getWeekStartAt());
      case TimeFilters.Month.name:
        return new Date(getMonthStartAt());
      case TimeFilters.Year.name:
        return new Date(getYearStartAt());
      default:
        return new Date(getDayStartAt());
    }
  };

  const getFirstDayEndAt = () => {
    const firstDayStartAt = getFirstDayStartAt();
    switch (timeFilter) {
      case TimeFilters.Day.name:
        return new Date(firstDayStartAt.setHours("05", "59", "59", "999"));
      case TimeFilters.Week.name:
        return new Date(firstDayStartAt.setHours("23", "59", "59", "999"));
      case TimeFilters.Month.name:
        return new Date(
          firstDayStartAt.getFullYear(),
          firstDayStartAt.getMonth(),
          7,
          "23",
          "59",
          "59",
          "999"
        );
      case TimeFilters.Year.name:
        return new Date(
          firstDayStartAt.getFullYear(),
          3,
          0,
          "23",
          "59",
          "59",
          "999"
        );
      default:
        return new Date(firstDayStartAt.setHours("05", "59", "59", "999"));
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
    const firstDayStartAt = getFirstDayStartAt();
    const firstDayEndAt = getFirstDayEndAt();
    const startAt = getNexTime(firstDayStartAt, i).toISOString();
    const endAt = getNexTime(firstDayEndAt, i).toISOString();

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

  const handleButtonClick = (e) => {
    const name = e.target.name;
    dispatch(timeFilterChanged(name));
  };

  const ClickedClassName = "analysis-page-button-clicked";

  const handleClick = (e) => {
    const targetButton = e.target.closest("button");
    if (!targetButton) return;
    const buttons = document.getElementsByClassName("analysis-page-button");

    if (buttons && buttons.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(ClickedClassName);
      }
    }
    targetButton.classList.add(ClickedClassName);
  };

  return (
    <div className="analysis-page-main">
      <div className="analysis-page-buttons" onClick={handleClick}>
        <button
          className="analysis-page-button analysis-page-button-clicked"
          type="button"
          name={TimeFilters.Day.name}
          onClick={handleButtonClick}
        >
          Day
        </button>
        <button
          className="analysis-page-button"
          type="button"
          name={TimeFilters.Week.name}
          onClick={handleButtonClick}
        >
          Week
        </button>
        <button
          className="analysis-page-button"
          type="button"
          name={TimeFilters.Month.name}
          onClick={handleButtonClick}
        >
          Month
        </button>
        <button
          className="analysis-page-button"
          type="button"
          name={TimeFilters.Year.name}
          onClick={handleButtonClick}
        >
          Year
        </button>
      </div>
      <h3 className="analysis-page-label">Working Time(minutes)</h3>
      <DoughnutChart chartData={chartData} chartOptions={chartOptions} />
    </div>
  );
};

export default AnalysisPage;
