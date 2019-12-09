import * as types from 'Constants/ActionTypes';
import defaultState from 'Constants/DefaultState';

const lifeReducer = (state = null, action) => {
    
    let newState;
    
    switch(action.type)
    {
        case types.ADJUST_LIFE:
            newState = state + action.value;
            break;

        case types.INITIALIZE_CURRENT_GAME:
            newState = defaultState.life;
            break;

        default:
            newState = state;
    }

    return newState;
};

export default lifeReducer;