import * as gameConst from 'Constants/GameConst';

const defaultState = {
    userInfos:{
        pseudo: ""
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
    life: 100,
    score: 0,
    words: [],
    wordPool: []
};

export default defaultState;