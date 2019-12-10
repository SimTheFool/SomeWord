import * as gameConst from 'Constants/GameConst';

const defaultState = {
    userInfos:{
        pseudo: "",
        bestChain: 0,
        typos: 0,
        timeElapsed: 0,
        speedReached: gameConst.VERY_SLOW
    },
    gameInfos: {
        device: gameConst.ON_DESKTOP,
        keyboard: gameConst.KEYBOARD_AZERTY,
        gameType: gameConst.SOLO,
        status: gameConst.NOT_PLAYING,
        speed: gameConst.SLOW
    },
    input: "",
    chain: 0,
    life: 25,
    score: 0,
    words: [],
    wordPool: []
};

export default defaultState;