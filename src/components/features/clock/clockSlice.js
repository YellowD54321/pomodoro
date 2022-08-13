import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { selectUserUid } from "../user/userSlice";

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
  record: [],
};

export const fetchRecords = createAsyncThunk(
  "clock/fetchRecords",
  async (uid) => {
    const userRef = doc(db, "users", uid);
    const response = await getDoc(userRef);
    const data = response.data();
    const recordArray = data.pomodoroRecord;
    return recordArray;
  }
);

export const addNewRecord = createAsyncThunk(
  "clock/addNewRecord",
  async ({ uid, lastRecord }) => {
    try {
      console.log("uid", uid);
      console.log("lastRecord", lastRecord);
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        pomodoroRecord: arrayUnion(lastRecord),
      });
    } catch (e) {
      console.log(e);
    }
  }
);

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
    clcokLastRecordInitial(state) {
      state.lastRecord = {
        ...initialState.lastRecord,
        id: nanoid(),
        startTime: new Date().toISOString(),
      };
    },
    clcokLastRecordEdited(state, action) {
      // reducer(state, action) {
      const { workTime, restTime, workContent } = action.payload;
      state.lastRecord = {
        ...state.lastRecord,
        workTime: workTime ?? state.lastRecord.workTime,
        restTime: restTime ?? state.lastRecord.restTime,
        workContent: workContent ?? state.lastRecord.workContent,
      };
    },
    clockFinished(state) {
      state.record.push(state.lastRecord);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state, action) => {
        console.log("fetchRecords is running.");
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        console.log("fetchRecords is fulfilled.");
        console.log("action", action);
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        console.log("action", action);
      });
  },
});

export const {
  clockStateSetToIdle,
  clockStateSetToWork,
  clockStateSetToNext,
  clcokSetInitialWorkTime,
  clcokSetInitialRestTime,
  clcokLastRecordEdited,
  clcokLastRecordInitial,
  clockFinished,
} = clcokSlice.actions;

export default clcokSlice.reducer;
