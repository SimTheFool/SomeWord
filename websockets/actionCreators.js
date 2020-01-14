import * as serverConst from './constants/serverConst';

export const addClient = function(ws)
{
    return (store) => {
        store.state.users.push({
            ws: ws,
            status: serverConst.STATUS_NOT_PLAYING,
            pairedWith: null
        });
    };
};

export const setClientStatus = function(ws, status)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        user.status = status;
    };
};

export const pairClient = function(ws)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        let opponent = store.findUserNotPlaying();
        user.pairedWith = opponent.ws;
        opponent.pairedWith = user.ws;
    };
};

export const freeClient = function(ws)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        let opponent = store.findUserByWs(user.pairedWith);
        user.pairedWith = null;
        opponent.pairedWith = null;
    };
};