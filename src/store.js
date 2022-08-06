import { configureStore } from "@reduxjs/toolkit";
import clockStateReducer from "./components/features/clock/clockSlice";
import userReducer from "./components/features/user/userSlice";

const store = configureStore({
  reducer: {
    clock: clockStateReducer,
    user: userReducer,
  },
});

export default store;
