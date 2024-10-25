const { goalsReducer } = require("./reducers/goalsReducer.js");
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        goals: goalsReducer
    },
});

console.log(store);