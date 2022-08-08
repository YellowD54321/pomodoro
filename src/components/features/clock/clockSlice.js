import { createSlice, nanoid, current } from "@reduxjs/toolkit";

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
  lastRecord: {
    startTime: 0,
    workTime: 0,
    restTime: 0,
    workContent: "",
  },
  records: [
    {
      id: -1,
      startTime: 0,
      workTime: 0,
      restTime: 0,
      workContent: "test",
    },
  ],
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
    clcokLastRecordAdded(state) {
      state.records.push({
        id: nanoid(),
        startTime: new Date().toISOString(),
        workTime: 0,
        restTime: 0,
        workContent: "",
      });
    },
    clcokLastRecordEdited(state, action) {
      const { workTime, restTime, workContent } = action.payload;
      const index = state.records.length - 1;
      state.records[index] = {
        ...state.records[index],
        workTime: workTime ?? state.records[index].workTime,
        restTime: restTime ?? state.records[index].restTime,
        workContent: workContent ?? state.records[index].workContent,
      };
    },
    clockFinished(state, action) {
      // state.record.push(state.lastRecord);
      // const { workTime, restTime, workContent } = action.payload;
      // state.record[state.record.length - 1] = {
      //   ...state.record,
      //   workTime: workTime ?? state.lastRecord.workTime,
      //   restTime: restTime ?? state.lastRecord.restTime,
      //   workContent: workContent ?? state.lastRecord.workContent,
      // };
    },
  },
});

export const {
  clockStateSetToIdle,
  clockStateSetToWork,
  clockStateSetToNext,
  clcokSetInitialWorkTime,
  clcokSetInitialRestTime,
  clcokLastRecordEdited,
  clcokLastRecordAdded,
  clockFinished,
} = clcokSlice.actions;

export default clcokSlice.reducer;
