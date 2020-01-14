import Env from 'Env';
import * as types from 'Constants/ActionTypes';
import * as actions from 'Actions';
import * as gameConst from 'Constants/GameConst';

const reportToWebsocket = function(store) {

    let connection = new WebSocket(`ws://${Env.webSocket.host}:${Env.webSocket.port}`);
    let sendMessage = function(msg)
    {
        connection.send(JSON.stringify(msg));
    };

    //@TODO handle message reception

    return next => action => {

        let state = store.getState();

        if(state.gameInfos.gameType === gameConst.MULTI)
        {
            return next(action);
        }

        if(state.gameInfos.gameType === gameConst.SOLO)
        {

            if(action.type === types.SET_STATUS && action.status !== state.gameInfos.status)
            {
                let effect = () => {};

                if(action.status === gameConst.NOT_PLAYING)
                {
                    effect = () => {
                        sendMessage({
                            msg: "SET_CLIENT_STATUS_NOT_PLAYING"
                        });
                    };
                }
                else if(action.status === gameConst.WAITING)
                {
                    effect = () => {
                        store.dispatch(actions.setStatus(gameConst.BEGINNING));
                    };
                }
                else if(action.status === gameConst.BEGINNING)
                {
                    effect = () => {
                        sendMessage({
                            msg: "SET_CLIENT_STATUS_PLAYING"
                        });
                    };
                }

                let result = next(action);
                effect();
                return result;
            }

            return next(action);
        }

        return next(action);
    };

};

export default reportToWebsocket;