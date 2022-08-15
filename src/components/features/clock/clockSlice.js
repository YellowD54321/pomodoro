import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
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

const clockAdapter = createEntityAdapter();

const initialState = clockAdapter.getInitialState({
  fetchStatus: "idle",
  status: "idle",
  initialWorkTime: 25,
  initialRestTime: 5,
  lastRecord: {
    startTime: 0,
    workTime: 0,
    restTime: 0,
    workContent: "",
  },
});

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
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        pomodoroRecord: arrayUnion(lastRecord),
      });
      return lastRecord;
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
        console.log("fetchRecords is pending.");
        state.fetchStatus = "pending";
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        console.log("fetchRecords is fulfilled.");
        clockAdapter.setAll(state, action.payload);
        state.fetchStatus = "idle";
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        console.log("action", action);
      })
      .addCase(addNewRecord.pending, (state, action) => {
        console.log("addNewRecord is pending.");
        state.fetchStatus = "pending";
      })
      .addCase(addNewRecord.fulfilled, clockAdapter.addOne);
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

export const { selectAll: selectRecords, selectById: selectRecordsById } =
  clockAdapter.getSelectors((state) => state.clock);

export const selectRecordIds = createSelector(selectRecords, (records) =>
  records.map((record) => record.id)
);
