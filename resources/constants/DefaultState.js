import * as gameConst from 'Constants/GameConst';

const defaultState = {
    userInfos:{
        pseudo: "",
        bestChain: 0,
        typos: 0,
        startTime: 0,
        endTime: 0,
        bestSpeed: ""
    },
    opponentInfos:{
        pseudo: "",
        chain: 0,
        score: 0,
        life: 0,
        words: []
    },
    gameInfos: {
        device: gameConst.ON_DESKTOP,
        keyboard: gameConst.KEYBOARD_AZERTY,
        gameType: gameConst.SOLO,
        status: gameConst.NOT_PLAYING,
        speed: 0
    },
    input: "",
    chain: 0,
    life: 100,
    score: 0,
    words: [],
    wordPool: [],
    flashMessages: []
};

export default defaultState;