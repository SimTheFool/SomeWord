import * as types from './constants/actionTypes.mjs';
import * as serverConst from './constants/serverConst.mjs';

let store = {
    users: []
};

var findUserByWs = function(ws)
{
    return store.users.find((user) => {
        return user.ws === ws;
    });
};

var findUserNotPlaying = function()
{
    return store.users.find((user) => {
        return user.status === serverConst.STATUS_NOT_PLAYING;
    });
};


export const dispatch = function(action, ws)
{
    let user;
    let opponent;

    switch(action.type)
    {
        case types.ADD_CLIENT:
            store.users.push({
                ws: ws,
                status: serverConst.STATUS_NOT_PLAYING,
                pairedWith: null
            });
            break;

        case types.SET_CLIENT_STATUS:
            user = findUserByWs(ws);
            user.status = action.status;
            break;

        case types.PAIR_CLIENT:
            user = findUserByWs(ws);
            opponent = findUserNotPlaying();
            user.pairedWith = opponent.ws;
            opponent.pairedWith = user.ws;
            break;

        case types.PAIR_CLIENT:
            user = findUserByWs(ws);
            opponent = findUserByWs(user.pairedWith);
            user.pairedWith = null;
            opponent.pairedWith = null;
            break;

        default:
            return;
    }
}