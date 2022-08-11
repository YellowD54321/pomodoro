import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  authenticationType: "",
  email: "",
  uid: "",
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticationTypeSetToGoogle(state) {
      state.authenticationType = "GOOGLE";
    },
    accountSetEmail(state, action) {
      state.email = action.payload;
    },
    accountSetUid(state, action) {
      state.uid = action.payload;
    },
  },
});

export const { authenticationTypeSetToGoogle, accountSetEmail, accountSetUid } =
  userSlice.actions;

export default userSlice.reducer;

export const { selectAll: selectUser } = userAdapter.getSelectors(
  (state) => state.user
);

export const selectUserUid = createSelector(selectUser, (user) => user.uid);
