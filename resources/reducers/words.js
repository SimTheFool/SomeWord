import * as types from 'Constants/ActionTypes';
import * as gameConst from 'Constants/GameConst';

const wordsReducer = (state = [], action) => {
    
    let newState = [...state];
    
    switch(action.type)
    {
        case types.ADD_WORD:

            let indices = [];
            state.forEach((word, index) => {
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
                value: action.word,
                timer: action.timer
            };
            break;

        case types.DELETE_WORD:
            newState[action.id] = {
                value: "",
                timer: gameConst.INFINITE[1]
            };
            break;

        case types.INITIALIZE_WORDS:
            newState = [];
            for(let i = 0; i< action.nb; i++)
            {
                newState.push({
                    value: "",
                    timer: gameConst.INFINITE[1]
                });
            }
            break;
            
        default:
    }
    return newState;
};

export default wordsReducer;