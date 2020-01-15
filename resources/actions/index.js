import * as types from 'Constants/ActionTypes';

export const setPseudo = (pseudo) => {
    return ({
        type: types.SET_PSEUDO,
        pseudo
    });
};

export const setBestChain = (bestChain) => {
    return ({
        type: types.SET_BEST_CHAIN,
        bestChain
    });
};

export const incrementTypos = () => {
    return ({
        type: types.INCREMENT_TYPOS
    });
};

export const setStartTime = (time) => {
    return ({
        type: types.SET_START_TIME,
        time
    });
};

export const setEndTime = (time) => {
    return ({
        type: types.SET_END_TIME,
        time
    });
};

export const setBestSpeed = (bestSpeed) => {
    return ({
        type: types.SET_BEST_SPEED,
        bestSpeed
    });
};

export const setOpponentInfos = (infos) => {
    return ({
        type: types.SET_OPPONENT_INFOS,
        infos
    });
};

export const setGameInfos = (infos) => {
    return ({
        type: types.SET_GAME_INFOS,
        infos
    });
};

export const setStatus = (status) => {
    return ({
        type: types.SET_STATUS,
        status
    });
};

export const setSpeed = (speedIndex) => {
    return ({
        type: types.SET_SPEED,
        speedIndex
    });
};

export const initializeCurrentGame = (infos) => {
    return({
        type: types.INITIALIZE_CURRENT_GAME,
        infos
    });
};

export const addWord = (wordPool, timer) => {
    return ({
        type: types.ADD_WORD,
        wordPool,
        timer
    });
};

export const deleteWord = (id) => {
    return ({
        type: types.DELETE_WORD,
        id
    });
};

export const deleteAllWords = () => {
    return({
        type: types.DELETE_ALL_WORDS
    });
};

export const validateWord = (id) => {
    return({
        type: types.VALIDATE_WORD,
        id
    });
};

export const setWordPool = (pool) => {
    return ({
        type: types.SET_WORD_POOL,
        pool
    });
};

export const adjustLife = (value) => {
    return ({
        type: types.ADJUST_LIFE,
        value
    });
};

export const incrementChain = () => {
    return ({
        type: types.INCREMENT_CHAIN
    });
};

export const resetChain = () => {
    return ({
        type: types.RESET_CHAIN
    });
};

export const incrementScore = (value) => {
    return ({
        type: types.INCREMENT_SCORE,
        value
    });
};

export const setInput = (value) => {
    return ({
        type: types.SET_INPUT,
        value
    });
};

export const resetInput = () => {
    return ({
        type: types.RESET_INPUT
    });
};