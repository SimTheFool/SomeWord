import * as types from 'Constants/ActionTypes';

const inputReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.SET_INPUT:
            newState = action.value;
            break;
        case types.RESET_INPUT:
            newState = "";
            break;
        default:
            newState = state;
    }

    return newState;
};

export default inputReducer;