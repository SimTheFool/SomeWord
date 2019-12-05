import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import 'normalize.css';
import './index.scss';

import HUD from 'Components/HUD';
import Board from 'Components/Board';
import InputText from 'Components/InputText';

import allReducers from './reducers';
import defaultState from 'Constants/DefaultState';

const store = createStore(
  allReducers,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <Provider store={store}>
        <HUD/>
        <Board/>
        <InputText/>
    </Provider>,
    document.getElementById('app')
);