import * as actionTypes from "../actions/actionTypes";

export const loginSuccess = authState => {
    return {type: actionTypes.LOGIN_SUCCESS, payload: authState}
}

export const logoutSuccess = () => {
    return {type: actionTypes.LOGOUT_SUCCESS, payload: null}
}