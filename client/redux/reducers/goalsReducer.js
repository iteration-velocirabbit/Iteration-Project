import * as types from '../constants/actionsTypes';

const initialState = [
    {
        goalName: '',
        goalAmount: '',
        goalDuration: '',
    },
];

export const goalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_GOAL:
            console.log('In the goal creator');
            return { ...state, goal : action.payload };
        default:
            return state;
    }
};

export default goalsReducer
