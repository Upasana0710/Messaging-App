import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import { applyMiddleware, compose, combineReducers} from "redux"
import thunk from "redux-thunk"
import {reducers} from '../src/redux/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({reducer: reducers}, {}, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={`831245369632-86dtars2ls6pflbgbfo8jdvdjuh6fsg0.apps.googleusercontent.com`}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
