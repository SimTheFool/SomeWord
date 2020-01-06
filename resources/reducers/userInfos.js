import * as types from 'Constants/ActionTypes';
import defaultState from 'Constants/DefaultState';

const userInfosReducer = (state = {}, action) => {
    
    let newState = {...state};
    
    switch(action.type)
    {
        case types.SET_USER_INFOS:
            newState = action.infos;
            break;

        case types.INITIALIZE_CURRENT_GAME:
            let pseudo = state.pseudo;
            newState = defaultState.userInfos;
            newState.pseudo = pseudo;
            break;

        case types.SET_PSEUDO:
            newState.pseudo = action.pseudo;
            break;
        
        case types.SET_BEST_CHAIN:
            newState.bestChain = action.bestChain;
            break;

        case types.INCREMENT_TYPOS:
            newState.typos ++;
            break;

        case types.SET_START_TIME:
            newState.startTime = action.time.getTime();
            break;

        case types.SET_END_TIME:
            newState.endTime = action.time.getTime();
            break;

        case types.SET_BEST_SPEED:
            newState.bestSpeed = action.bestSpeed;
            break;

        default:
            newState = state;
    }

    return newState;
};

export default userInfosReducer;