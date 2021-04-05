import React from 'react';
import {render} from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import "regenerator-runtime/runtime";
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './Components/App';
import {rootReducer} from "./redux/reducer"


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const rootElement = document.getElementById("root")
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
)
