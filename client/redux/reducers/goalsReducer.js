import * as types from '../constants/actionsTypes';

const initialState = {
  goals: [],
  tempGoal: {
    goalName: '',
    goalAmount: '',
    goalDuration: '',
  },
  progress: '',
};

export const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_GOAL:
      return { ...state, tempGoal: action.payload };
    case types.STORE_GOALS:
      return { ...state, goals: action.payload };
    case types.UPDATE_PROGRESS:
      return { ...state, progress: action.payload };
    case types.DELETE_GOAL:
      return {...state, goals: goals.filter(goal => goal.id !== action.payload)};
    default:
      return state;
  }
};

export default goalsReducer;
