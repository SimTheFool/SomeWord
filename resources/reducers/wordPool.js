import * as types from 'Constants/ActionTypes';

const wordPoolReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.SET_WORD_POOL:
            newState = action.pool;
            break;

        default:
            newState = state;
    }

    return newState;
};

export default wordPoolReducer;