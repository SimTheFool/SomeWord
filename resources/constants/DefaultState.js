import * as gameConst from 'Constants/GameConst';

const defaultState = {
    userInfos:{
        pseudo: "Papebrock"
    },
    gameInfos: {
        device: gameConst.ON_DESKTOP,
        keyboard: gameConst.KEYBOARD_AZERTY,
        type: gameConst.SOLO,
        status: gameConst.PLAYING,
        wordNb: 15,
        speed: gameConst.MEDIUM
    },
    input: "",
    chain: 0,
    life: 100,
    score: 0,
    words: [
        {
            value: "BANANE",
            timer: gameConst.MEDIUM
        },
        {
            value: "AZE",
            timer: gameConst.INFINITE
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "BRENDA",
            timer: gameConst.FAST
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "SECRETAIRE",
            timer: gameConst.SLOW
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "VACUITE",
            timer: gameConst.FAST
        },
        {
            value: "ETOILE",
            timer: gameConst.MEDIUM
        },
        {
            value: "TEMPERANCE",
            timer: gameConst.MEDIUM
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "",
            timer: gameConst.INFINITE
        },
        {
            value: "MEDECINE",
            timer: gameConst.MEDIUM
        }
    ],
    wordPool: []
};

export default defaultState;