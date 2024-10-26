import { goalsReducer } from "../reducers/goalsReducer.js";
import { loginReducer } from "../reducers/loginReducer.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    login: loginReducer,
  },
});
