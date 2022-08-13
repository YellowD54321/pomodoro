import {
  createSlice,
  createEntityAdapter,
  createSelector,
  configureStore,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const AuthType = {
  Google: "GOOGLE",
  Apple: "APPLE",
  Guest: "GUEST",
};

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  entities: {
    authenticationType: "",
    email: "",
    uid: "",
  },
  authenticationType: "",
  email: "",
  uid: "",
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    accountSetAuthenticationType(state, action) {
      state.authenticationType = action.payload;
    },
    accountSetEmail(state, action) {
      state.email = action.payload;
    },
    accountSetUid(state, action) {
      state.uid = action.payload;
    },
  },
});

export const { accountSetAuthenticationType, accountSetEmail, accountSetUid } =
  userSlice.actions;

export default userSlice.reducer;

// export const { selectAll: selectUser } = userAdapter.getSelectors((state) => {
//   console.log("state", state);
//   return state.user;
// });

// export const selectUserUid = createSelector(selectUser, (user) => user.uid);
