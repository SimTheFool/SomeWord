import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import defaultState from 'Constants/DefaultState';

import 'normalize.css';
import './index.scss';

import App from 'Components/App';
import WSConnection from 'Components/WSConnection';

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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
    <WSConnection/>
  </Provider>,    
    appNode
);