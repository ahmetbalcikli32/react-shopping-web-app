import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./index";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import initialState from "./initialState";
import SecureLS from "secure-ls";

const composeEnhancers = composeWithDevTools({});

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const auth = secureLs.get('auth');
    let stateInLocalStorage = [initialState.defaultState];
    if (auth) {
        return auth;
    }
    return stateInLocalStorage;
}

const getCartFromStorage = () => {
    const cart = secureLs.get('cart');
    let cartInLocalStorage = [initialState.cart];
    if (cart) {
        return cart;
    } else if (cart == null) {
        return undefined;
    }
    return cartInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLs.set('auth', newState);
}

const updateCartInStorage = newState => {
    secureLs.set('cart', newState);
}

const configureStore = () => {

    const store = createStore(rootReducer, {authReducer: getStateFromStorage(), cartReducer: getCartFromStorage()}, composeWithDevTools(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState().authReducer)
        updateCartInStorage(store.getState().cartReducer)
    });
    return store;
}

export default configureStore;