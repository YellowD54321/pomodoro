import { createSelector, createSlice } from "@reduxjs/toolkit";

// 1. time filter
// 2. work content filter
// 3. maybe abandon filter

export const getDayStartAt = () => {
  const today = new Date();
  const setHoursStart = today.setHours("00", "00", "00", "000");
  const startAt = new Date(setHoursStart).toISOString();
  return startAt;
};

export const getDayEndAt = () => {
  const today = new Date();
  const setHoursEnd = today.setHours("23", "59", "59", "999");
  const endAt = new Date(setHoursEnd).toISOString();
  return endAt;
};

export const getWeekStartAt = () => {
  const today = new Date();
  const todayIndex = today.getDay();
  const startAtMs = today.setDate(today.getDate() - todayIndex);
  const setHoursStart = new Date(startAtMs).setHours("00", "00", "00", "000");
  const startAt = new Date(setHoursStart).toISOString();
  return startAt;
};

export const getWeekEndAt = () => {
  const today = new Date();
  const todayIndex = today.getDay();
  const endAtMs = today.setDate(today.getDate() + 6 - todayIndex);
  const setHoursEnd = new Date(endAtMs).setHours("23", "59", "59", "999");
  const endAt = new Date(setHoursEnd).toISOString();
  return endAt;
};

export const getMonthStartAt = () => {};

export const getMonthEndAt = () => {};

export const getYearStartAt = () => {};

export const getYearEndAt = () => {};

export const TimeFilters = {
  Day: {
    name: "day",
    startAt: getDayStartAt(),
    endAt: getDayEndAt(),
  },
  Week: {
    name: "week",
    startAt: getWeekStartAt(),
    endAt: getWeekEndAt(),
  },
  Month: {
    name: "month",
    startAt: getMonthStartAt(),
    endAt: getMonthEndAt(),
  },
  Year: {
    name: "year",
    startAt: getYearStartAt(),
    endAt: getYearEndAt(),
  },
  LastSevenDays: {
    name: "lastSevenDays",
    startAt: getWeekStartAt(),
    endAt: getWeekEndAt(),
  },
  LastThirtyDays: {
    name: "lastThirtyDays",
    startAt: getWeekStartAt(),
    endAt: getWeekEndAt(),
  },
};

const initialState = {
  timeDuration: TimeFilters.Day,
  workContent: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    workContentFilterChanged(state, action) {
      state.workContent = action.payload;
    },
    timeFilterChanged(state, action) {
      state.timeDuration = TimeFilters.find(
        (duration) => duration.name === action.payload
      );
    },
  },
});

export const { workContentFilterChanged, timeFilterChanged } =
  filterSlice.actions;

export default filterSlice.reducer;

export const selectTimeDurationName = createSelector(
  (state) => state.filters,
  (filters) => filters.timeDuration.name
);
