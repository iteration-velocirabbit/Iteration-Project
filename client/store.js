const { goalsReducer } = require("./reducers/goalsReducer.js");
const { configureStore } = require("@reduxjs/toolkit");

export default configureStore({
    reducer: {
        goalsReducer
    }
})
