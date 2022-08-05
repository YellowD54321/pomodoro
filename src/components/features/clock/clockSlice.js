import { createSlice } from "@reduxjs/toolkit";

export const ClockStatus = {
  Idle: "idle",
  Work: "work",
  Rest: "rest",
  Stop: "stop",
};

const initialState = {
  status: "idle",
  initialWorkTime: 25,
  initialRestTime: 5,
  record: {
    workTime: 0,
    restTime: 0,
    workContent: "",
  },
};

const clcokSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    clockStateSetToIdle(state) {
      state.status = ClockStatus.Idle;
    },
    clockStateSetToWork(state) {
      state.status = ClockStatus.Work;
    },
    clockStateSetToNext(state) {
      switch (state.status) {
        case ClockStatus.Idle:
          state.status = ClockStatus.Work;
          break;
        case ClockStatus.Work:
          state.status = ClockStatus.Rest;
          break;
        case ClockStatus.Rest:
          state.status = ClockStatus.Idle;
          break;
        default:
          state.status = ClockStatus.Idle;
      }
    },
    clcokSetInitialWorkTime(state, action) {
      state.initialWorkTime = +action.payload;
    },
    clcokSetInitialRestTime(state, action) {
      state.initialRestTime = +action.payload;
    },
    clcokRecordAdded(state, action) {
      // reducer(state, action) {
      const { workTime, restTime, workContent } = action.payload;
      state.record = {
        workTime: workTime ?? state.record.workTime,
        restTime: restTime ?? state.record.restTime,
        workContent: workContent ?? state.record.workContent,
      };
    },
  },
});

export const {
  clockStateSetToIdle,
  clockStateSetToWork,
  clockStateSetToNext,
  clcokSetInitialWorkTime,
  clcokSetInitialRestTime,
  clcokRecordAdded,
} = clcokSlice.actions;

export default clcokSlice.reducer;
