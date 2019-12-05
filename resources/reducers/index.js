import {combineReducers} from 'redux';

import userInfosReducer from './userInfos';
import gameInfosReducer from './gameInfos';
import inputReducer from './input';
import chainReducer from './chain';
import lifeReducer from './life';
import scoreReducer from './score';
import wordsReducer from './words';
import wordPoolReducer from './wordPool';

const allReducers = combineReducers({
    userInfos: userInfosReducer,
    gameInfos: gameInfosReducer,
    input: inputReducer,
    chain: chainReducer,
    life: lifeReducer,
    score: scoreReducer,
    words: wordsReducer,
    wordPool: wordPoolReducer
});

export default allReducers;