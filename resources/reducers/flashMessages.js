import * as types from 'Constants/ActionTypes';


const flashMessagesReducer = (state = [], action) => {
    
    let newState = [...state];
    
    switch(action.type)
    {
        case types.ADD_FLASH_MESSAGE:
            let index = newState.findIndex((flashMessage) => {
                return flashMessage.id === action.flashMessage.id;
            });

            if(index < 0)
            {
                newState.unshift(action.flashMessage);
            }

            break;

        case types.REMOVE_FLASH_MESSAGE:
            let id = newState.findIndex((flashMessage) => {
                return flashMessage.id === action.id;
            });

            if(id >= 0)
            {
                newState.splice(id, 1);
            }
            break;

        case types.INITIALIZE_CURRENT_GAME:
            newState =  [];
            break;
            
        default:
            newState = state;
    }

    return newState;
};

export default flashMessagesReducer;