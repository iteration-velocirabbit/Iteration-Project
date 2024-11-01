import * as types from '../constants/actionsTypes';

const initialState = {
    username: '',
    password: '',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.STORE_USER:
            console.log('In the user reducer');
            return { ...state, username : action.payload };
        default:
            return state;
    }
};

export default userReducer