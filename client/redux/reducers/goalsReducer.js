import * as types from '../constants/actionsTypes';

const initialState = [
    {
        goalId: '',
        goalName: '',
        goalAmount: '',
        goalDuration: '',
        goalProgress: '',
        goalPercentage: ''
    },
];

export const goalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_GOAL:
            console.log('In the goal creator, action:', action.payload);
            return { ...state, goal : action.payload };
        case types.STORE_GOALS:
            return { ...state, goals: action.payload };
        default:
            return state;
    }
};

export default goalsReducer
