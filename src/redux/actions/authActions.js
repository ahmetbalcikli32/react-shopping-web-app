import * as actionTypes from "../actions/actionTypes";

export const getLoggedInUserState = (loggedInState) => {
    return {type: actionTypes.GET_LOGGED_IN_USER_STATES, payload: loggedInState}
}

export const logoutSuccess = () => {
    console.log("logout1")
    return {type: actionTypes.LOGOUT_USER}
}