import * as types from 'Constants/ActionTypes';

const lifeReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.ADJUST_LIFE:
            newState = state + action.value;
            break;
        default:
            newState = state;
    }

    return newState;
};

export default lifeReducer;