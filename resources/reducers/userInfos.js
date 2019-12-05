import * as types from 'Constants/ActionTypes';

const userInfosReducer = (state = {}, action) => {
    
    let newState = {...state};
    
    switch(action.type)
    {
        case types.SET_USER_INFOS:
            newState = action.infos;
            break;
        default:
    }

    return newState;
};

export default userInfosReducer;