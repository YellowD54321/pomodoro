import { createSlice } from "@reduxjs/toolkit";

export const ClockStatus = {
  Idle: "idle",
  Work: "work",
  Rest: "rest",
  Stop: "stop",
};

const initialState = {
  status: "idle",
};

const clcokSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    clockStateSetToIdle(state, action) {
      state.status = ClockStatus.Idle;
    },
    clockStateSetToWork(state, action) {
      state.status = ClockStatus.Work;
    },
  },
});

export const { clockStateSetToIdle, clockStateSetToWork } = clcokSlice.actions;

export default clcokSlice.reducer;
