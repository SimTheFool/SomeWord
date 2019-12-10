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

        default:
    }

    return newState;
};

export default userInfosReducer;