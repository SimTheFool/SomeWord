import {combineReducers} from 'redux';

import userInfosReducer from './userInfos';
import opponentInfosReducer from './opponentInfos';
import gameInfosReducer from './gameInfos';
import inputReducer from './input';
import chainReducer from './chain';
import lifeReducer from './life';
import scoreReducer from './score';
import wordsReducer from './words';
import wordPoolReducer from './wordPool';
import flashMessagesReducer from './flashMessages';

const allReducers = combineReducers({
    userInfos: userInfosReducer,
    opponentInfos: opponentInfosReducer,
    gameInfos: gameInfosReducer,
    input: inputReducer,
    chain: chainReducer,
    life: lifeReducer,
    score: scoreReducer,
    words: wordsReducer,
    wordPool: wordPoolReducer,
    flashMessages: flashMessagesReducer
});

export default allReducers;