export const addClient = function(ws)
{
    return (store) => {
        store.state.users.push({
            ws: ws,
            pairedWith: null,
            playAgain: false
        });
    };
};

export const removeClient = function(ws)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        let opponent = user.pairedWith;

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

        if(opponent)
        {
            opponent.pairedWith = null;
            return opponent;
        }        
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
        if(opponent)
        {
            opponent.pairedWith = null;
            user.pairedWith = null;
            return opponent;
        }
    };
};

export const setClientPlayAgain = function(ws)
{
    return (store) => {
        let user = store.findUserByWs(ws);
        user.playAgain = true;
        let opponent = user.pairedWith;

        if(!opponent)
        {
            return null;
        }

        if(opponent.playAgain)
        {
            return [user, opponent];
        }
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

            return [user1, user2];
        }

        return null;
    };
}