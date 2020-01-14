import Env from 'Env';
import * as types from 'Constants/ActionTypes';
import * as gameConst from 'Constants/GameConst';

const reportToWebsocket = function(store) {

    let connection = new WebSocket(`ws://${Env.webSocket.host}:${Env.webSocket.port}`);
    let sendMessage = function(msg)
    {
        connection.send(JSON.stringify(msg));
    };


    //@TODO handle message reception;

    return next => action => {

        let state = store.getState();

/*         if(action.type === types.SET_STATUS && action.status === gameConst.WAITING)
        {
            if(state.gameInfos.gameType === gameConst.MULTI)
            {
                let result = next(action);
                sendMessage(serverActions.pairClient());
                return result;
            }
            else
            {
                action.status = gameConst.BEGINNING;
                return next(action);
            }
        } */



        return next(action);
    };

};

export default reportToWebsocket;