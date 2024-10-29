import * as types from '../constants/actionsTypes';

const initialState = {
    username: '',
    password: '',
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_USERNAME:
            console.log('In the username reducer');
            return { ...state, username : action.payload };
        case types.LOGIN_PASSWORD:
            console.log('In the password reducer')
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

export default loginReducer