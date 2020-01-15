import * as serverConst from './constants/serverConst';

export const addClient = function(ws)
{
    return (store) => {
        store.state.users.push({
            ws: ws,
            //status: serverConst.STATUS_NOT_PLAYING,
            pairedWith: null
        });
    };
};

export const removeClient = function(ws)
{
    return (store) => {
        let index = store.findUserIndexByWs(ws);
        if(index !== -1)
        {
            store.state.users.splice(index, 1);
        }

        index= store.findUserIndexInPairQueueByWs(ws);
        if(index !== -1)
        {
            store.state.pairQueue.splice(index, 1);
        }
        
    };
};

export const setClientStatus = function(ws, status)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        user.status = status;
    };
};

export const stackInPairQueue = function(ws)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        store.state.pairQueue.push(user);
    };
};

export const freeFromPairQueue = function(ws)
{
    return (store) => {
        let index = store.findUserIndexInPairQueueByWs(ws);
        if(index === -1)
        {
            return;
        }
        store.state.pairQueue.splice(index, 1);
    };
};

export const unpair = function(ws)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        let opponent = user.pairedWith;
        opponent.pairedWith = null;
        user.pairedWith = null;
    };
};

export const pairClientsProcess = function()
{
    return (store) => {
        let queue = store.state.pairQueue;

        if(queue.length >= 2)
        {
            let user1 = queue.shift();
            let user2 = queue.shift();
            user1.pairedWith = user2;
            user2.pairedWith = user1;

            return [user1.ws, user2.ws];
        }

        return null;
    };
}