import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';

import allReducers from './reducers';
import reportToWebsocket from 'Middlewares/reportToWebsocket';
import defaultState from 'Constants/DefaultState';

import 'normalize.css';
import './index.scss';

import App from 'Components/App';

const appNode = document.getElementById('app');

// Using inner height for app size, instead 100vh which leads to inconsitencies on mobile.
appNode.style.height = `${window.innerHeight}px`;

window.addEventListener('orientationchange', (e) => {

  var afterOrientationChange = (e) => {
      appNode.style.height = `${window.innerHeight}px`;
      window.removeEventListener('resize', afterOrientationChange);
  };

  window.addEventListener('resize', afterOrientationChange);
});

// Creating the store and rendering the app.
const store = createStore(
  allReducers,
  defaultState,
  composeWithDevTools(applyMiddleware(reportToWebsocket))
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,    
    appNode
);