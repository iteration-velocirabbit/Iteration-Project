import { goalsReducer } from "../reducers/goalsReducer.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
});
