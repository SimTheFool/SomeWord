import * as types from 'Constants/ActionTypes';

const chainReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.INCREMENT_CHAIN:
            newState = state + 1;
            break;
        case types.RESET_CHAIN:
                newState = 0;
                break;
        default:
            newState = state;
    }

    return newState;
};

export default chainReducer;