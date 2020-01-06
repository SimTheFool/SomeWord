import * as types from 'Constants/ActionTypes';
import {SPEEDS} from 'Constants/GameConst';
import { bindActionCreators } from 'redux';

const gameInfosReducer = (state = {}, action) => {
    
    let newState = {...state};

    switch(action.type)
    {
        case types.SET_GAME_INFOS:
            newState = action.infos;
            break;

        case types.SET_STATUS:
            newState.status = action.status;
            break;

        case types.SET_SPEED:
            newState.speed = action.speedIndex;
            break;

        case types.INITIALIZE_CURRENT_GAME:
            newState.speed = 0;
            break;

        default:
            newState = state;
    }

    return newState;
};

export default gameInfosReducer;