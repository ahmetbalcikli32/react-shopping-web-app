import * as actionTypes from "../actions/actionTypes";
import initialState from "../reducers/initialState";

const authReducer = (state = initialState.defaultState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT_SUCCESS:
            return initialState.defaultState;
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...action.payload,
                isLoggedIn: true
            }
        default:
            return state;
    }
}

export default authReducer;