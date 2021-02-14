import * as actionTypes from "../actions/actionTypes";

export default function getLoggedInUserSuccess(user) {
    return {type: actionTypes.GET_LOGGED_IN_USER_SUCCESS, payload: user}
}

export default function getLoggedInUser(userId) {
    const url = "api/users/?user_id";
    return {type: actionTypes.GET_LOGGED_IN_USER_SUCCESS, payload: user}
}