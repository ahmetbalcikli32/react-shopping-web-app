import * as actionTypes from "../actions/actionTypes";
import initialState from "../reducers/initialState";

const userReducer = (state = initialState.defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGGED_IN_USER_STATES:
            let loggedInState = {
                isLoggedIn: true,
                username: 'admin',
                firstName: 'ahmet',
                lastName: 'özbek',
                email: 'ahmet@gmail.com',
                password: undefined
            }
            return loggedInState;
        case actionTypes.LOGOUT_USER:
            console.log("logout oldu")
            return state;
        default:
            return state;
    }
}

export default userReducer;