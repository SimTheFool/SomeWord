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
            newState.speed = SPEEDS[action.speedIndex];
            break;

        default:
    }

    return newState;
};

export default gameInfosReducer;