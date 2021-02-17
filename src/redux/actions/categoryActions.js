import * as actionTypes from "./actionTypes";

const API_URL = "api/categories";

export function changeCategory(category) {
    return {type: actionTypes.CHANGE_CATEGORY, payload: category};
}

export function getCategoriesSuccess(category) {
    return {type: actionTypes.GET_CATEGORIES_SUCCESS, payload: category};
}

export function getCategories() {
    return function (dispatch) {

        return fetch(API_URL)
            .then(response => response.json())
            .then(data => dispatch(getCategoriesSuccess(data)))
    }
}