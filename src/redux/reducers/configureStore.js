import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./index";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import initialState from "./initialState";

const composeEnhancers = composeWithDevTools({});

const configureStore = () => {

    let stateInLocalStorage = initialState.defaultState;

    const auth = localStorage.getItem('applicationState');

    if (auth) {
        stateInLocalStorage = JSON.parse(auth);
    }

    const store = createStore(rootReducer, {authReducer: stateInLocalStorage}, composeWithDevTools(applyMiddleware(thunk)));

    store.subscribe(() => {
        localStorage.setItem('auth', JSON.stringify(store.getState().authReducer));

    });

    return store;
}

export default configureStore;