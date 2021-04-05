import React from "react";
import { Provider } from 'react-redux';
import {createStore} from "redux";
import {rootReducer} from "../redux/reducer"
import App  from "../Components/App";
import Loader  from "../Components/Loader";


import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const store = createStore(rootReducer);
describe("<App />", () => {
  test('Component App should be rendered', () => {
    render(<Provider store={store}><App /></Provider>)
  })
});

describe("<Loader />", () => {
  test('Component Loader should be rendered', () => {
    render(<Loader />)
  })
});

