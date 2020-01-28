class Store {

    constructor()
    {

    }

    state = 
    {
        users: [],
        pairQueue: []
    }

    dispatch = function(action, afterEffect = () => {})
    {
        let result = action(this);
        afterEffect(result);
    }

    findUserByWs = function(ws)
    {
        return this.state.users.find((user) => {
            return user.ws === ws;
        });
    }

    findUserIndexByWs = function(ws)
    {
        return this.state.users.findIndex((user) => {
            return user.ws === ws;
        });
    }

    findUserIndexInPairQueueByWs = function(ws)
    {
        return this.state.pairQueue.findIndex((user) => {
            return user.ws === ws;
        });
    }
};

let store = new Store();

export default store;