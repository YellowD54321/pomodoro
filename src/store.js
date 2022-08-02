import { configureStore } from "@reduxjs/toolkit";
import clockStateReducer from "./components/features/clock/clockSlice";

const store = configureStore({
  reducer: {
    clock: clockStateReducer,
  },
});

export default store;
