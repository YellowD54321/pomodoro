import { configureStore } from "@reduxjs/toolkit";
import clockStateReducer from "./components/features/clock/clockSlice";
import userReducer from "./components/features/user/userSlice";
import filterReducer from "./components/features/filter/filterSlice";

const store = configureStore({
  reducer: {
    clock: clockStateReducer,
    user: userReducer,
    filters: filterReducer,
  },
});

export default store;
