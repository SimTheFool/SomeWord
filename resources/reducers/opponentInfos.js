import * as types from 'Constants/ActionTypes';

const opponentInfosReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.SET_OPPONENT_INFOS:
            newState = action.infos;
            break;
            
        default:
            newState = state;
    }

    return newState;
};

export default opponentInfosReducer;