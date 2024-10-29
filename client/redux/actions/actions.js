import * as types from '../constants/actionsTypes.js';

export const loginUsernameActionCreator = (username) => ({
    type: types.LOGIN_USERNAME,
    payload: username
});

export const loginPasswordActionCreator = (password) => ({
    type: types.LOGIN_PASSWORD,
    payload: password
});

export const goalActionCreator = (goal) => ({
    type: types.CREATE_GOAL,
    payload: goal
});