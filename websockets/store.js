class Store {

    constructor()
    {
        this.state = {
            users: [],
            pairQueue: []
        }

        this.dispatch = function(action, afterEffect = () => {})
        {
            let result = action(this);
            afterEffect(result);
        }
    
        this.findUserByWs = function(ws)
        {
            return this.state.users.find((user) => {
                return user.ws === ws;
            });
        }
    
        this.findUserIndexByWs = function(ws)
        {
            return this.state.users.findIndex((user) => {
                return user.ws === ws;
            });
        }
    
        this.findUserIndexInPairQueueByWs = function(ws)
        {
            return this.state.pairQueue.findIndex((user) => {
                return user.ws === ws;
            });
        }
    }
};

let store = new Store();

export default store;