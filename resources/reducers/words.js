import * as types from 'Constants/ActionTypes';
import * as gameConst from 'Constants/GameConst';

const wordsReducer = (state = [], action) => {
    
    let newState = [...state];
    
    switch(action.type)
    {
        case types.ADD_WORD:

            let indices = [];
            newState.forEach((word, index) => {
                if(word.value === "")
                {
                    indices.push(index);
                }
            });

            if(!indices.length)
            {
                break;
            }

            let rdIndex = indices[Math.floor(Math.random() * indices.length)];

            newState[rdIndex] = {
                value: action.wordPool[Math.floor(Math.random() * action.wordPool.length)],
                timer: action.timer,
                validated: false
            };
            break;

        case types.DELETE_WORD:
            newState[action.id] = {
                value: "",
                timer: gameConst.INFINITE.unspawnDelay,
                validated: false
            };
            break;

        case types.DELETE_ALL_WORDS:
            newState = newState.map((word) => {
                return {
                    value: "",
                    timer: gameConst.INFINITE.unspawnDelay,
                    validated: false
                }
            });
            break;

        case types.VALIDATE_WORD:
            newState[action.id].validated = true;
            break;

        case types.INITIALIZE_CURRENT_GAME:
            newState = [];
            let nb= (action.infos.gameType === gameConst.SOLO) ? gameConst.WORD_NB_SOLO : gameConst.WORD_NB_MULTI;

            for(let i = 0; i< nb; i++)
            {
                newState.push({
                    value: "",
                    timer: gameConst.INFINITE.unspawnDelay,
                    validated: false
                });
            }
            break;
            
        default:
            newState = state;
    }
    return newState;
};

export default wordsReducer;