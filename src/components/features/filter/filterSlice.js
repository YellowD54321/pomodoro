import { createSlice } from "@reduxjs/toolkit";

// 1. time filter
// 2. work content filter
// 3. maybe abandon filter

export const TimeFilters = {
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year",
  LastSevenDays: "last-seven-days",
  LastThirtyDays: "last-thirty-days",
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
      state.timeDuration = action.payload;
    },
  },
});

export const { workContentFilterChanged, timeFilterChanged } =
  filterSlice.actions;

export default filterSlice.reducer;
