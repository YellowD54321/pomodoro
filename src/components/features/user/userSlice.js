import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticationType: "",
  email: "",
};

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
  },
});

export const { authenticationTypeSetToGoogle, accountSetEmail } =
  userSlice.actions;

export default userSlice.reducer;
