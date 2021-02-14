import * as actionTypes from "../actions/actionTypes";

const API_URL = "api/products";

export function getProductsSuccess(product) {
    return {type: actionTypes.GET_PRODUCTS_SUCCESS, payload: product};
}

export function getProducts(categoryId) {

    return function (dispatch) {
        let url = API_URL;
        if (categoryId) {
            url = API_URL + "/?category_id=" + categoryId
        }
        return fetch(url)
            .then(response => response.json())
            .then(data => dispatch(getProductsSuccess(data)))
    }
}