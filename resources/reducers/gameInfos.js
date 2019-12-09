import * as types from 'Constants/ActionTypes';
import { bindActionCreators } from 'redux';

const gameInfosReducer = (state = {}, action) => {
    
    let newState = {...state};

    switch(action.type)
    {
        case types.SET_GAME_INFOS:
            newState = action.infos;
            break;
        default:
    }

    return newState;
};

export default gameInfosReducer;