import * as types from 'Constants/ActionTypes';
import * as gameConst from 'Constants/GameConst';

const wordsReducer = (state = [], action) => {
    
    let newState = [...state];
    
    switch(action.type)
    {
        case types.ADD_WORD:
            newState[action.id] = {
                value: action.word,
                timer: action.timer
            };
            break;

        case types.DELETE_WORD:
            newState[action.id] = {
                value: "",
                timer: gameConst.INFINITE
            };
            break;
            
        default:
    }

    return newState;
};

export default wordsReducer;