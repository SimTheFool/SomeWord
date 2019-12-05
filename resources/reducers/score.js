import * as types from 'Constants/ActionTypes';

const scoreReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.INCREMENT_SCORE:
            newState = state + action.value;
            break;
        default:
            newState = state;
    }

    return newState;
};

export default scoreReducer;