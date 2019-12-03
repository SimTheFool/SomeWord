import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.scss';

import HUD from 'Components/HUD';
import Board from 'Components/Board';
import InputText from 'Components/InputText';

ReactDOM.render(
    <>
    <HUD/>
    <Board/>
    <InputText/>
    </>,
    document.getElementById('app')
  );