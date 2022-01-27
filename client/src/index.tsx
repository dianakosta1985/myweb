import React from "react";
import ReactDOM from "react-dom";
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
//import axios from 'axios';

import App from "./App";
//import config from './config';
import createRootReducer from './store/reducers';

import { createBrowserHistory } from 'history';

//import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

export function getHistory() {
  return history;
}

/*axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}*/

export const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk,
    ),
    composeWithDevTools()
  )
);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
