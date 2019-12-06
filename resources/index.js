import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import defaultState from 'Constants/DefaultState';

import 'normalize.css';
import './index.scss';

import App from 'Components/App';

const store = createStore(
  allReducers,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);