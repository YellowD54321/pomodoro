import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";

import store from "./store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchRecords } from "./components/features/clock/clockSlice";
import {
  accountSetAuthenticationType,
  accountSetEmail,
  accountSetUid,
  AuthType,
} from "./components/features/user/userSlice";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(accountSetAuthenticationType(AuthType.Google));
    store.dispatch(accountSetEmail(user.email));
    store.dispatch(accountSetUid(user.uid));
    store.dispatch(fetchRecords(user.uid));
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
