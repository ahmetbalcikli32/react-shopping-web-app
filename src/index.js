import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/base/App';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import configureStore from "./redux/reducers/configureStore";
import {Provider} from "react-redux";
import "alertifyjs/build/css/alertify.min.css";
import {BrowserRouter, HashRouter} from "react-router-dom";

const store = configureStore();
ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>
    </HashRouter>
    ,
    document.getElementById('root')
);

reportWebVitals();
