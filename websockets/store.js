import serverConst from './constants/serverConst';

let store = {

    state: 
    {
        users: []
    },

    dispatch: function(action)
    {
        action(this);
    },

    findUserByWs: function(ws)
    {
        return this.state.users.find((user) => {
            return user.ws === ws;
        });
    },

    findUserNotPlaying: function()
    {
        return this.state.users.find((user) => {
            return user.status === serverConst.STATUS_NOT_PLAYING;
        });
    }
};

export default store;