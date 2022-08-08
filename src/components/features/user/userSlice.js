import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticationType: "",
  user: {
    email: "",
    uid: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticationTypeSetToGoogle(state) {
      state.authenticationType = "GOOGLE";
    },
    accountSetUserInfo(state, action) {
      const { email, uid } = action.payload;
      state.user = {
        email,
        uid,
      };
    },
  },
});

export const { authenticationTypeSetToGoogle, accountSetUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
