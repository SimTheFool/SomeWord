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

    connection.onmessage = (e) => {
        let data = JSON.parse(e.data);

        switch(data.msg)
        {
            case "START_PLAYING":
                store.dispatch(actions.setStatus(gameConst.BEGINNING));
                break;
                
            default:
        }
    }

    return next => action => {

        let state = store.getState();
        let previousEffect = () => {};
        let afterEffect = () => {};

        let isMulti = state.gameInfos.gameType === gameConst.MULTI;
        let isChangingStatus = (action.type === types.SET_STATUS) && (action.status !== state.gameInfos.status);

        if(isChangingStatus)
        {
            if(action.status === gameConst.NOT_PLAYING)
            {
                if(isMulti)
                {
                    if(state.gameInfos.status === gameConst.NOT_PLAYING)
                    {
                        afterEffect = () => {
                            sendMessage({
                                msg: "UNPAIR"
                            });
                        };
                    }

                    if(state.gameInfos.status === gameConst.WAITING)
                    {
                        afterEffect = () => {
                            sendMessage({
                                msg: "FREE_FROM_PAIR_QUEUE"
                            });
                        };
                    }
                }
                else
                {
                    afterEffect = () => {
                        sendMessage({
                            msg: "SET_CLIENT_STATUS_NOT_PLAYING"
                        });
                    };
                }
            }
            else if(action.status === gameConst.WAITING)
            {
                if(isMulti)
                {
                    afterEffect = () => {
                        sendMessage({
                            msg: "STACK_IN_PAIR_QUEUE"
                        });
                    };
                }
                else
                {
                    afterEffect = () => {
                        store.dispatch(actions.setStatus(gameConst.BEGINNING));
                    };
                } 
            }
            else if(action.status === gameConst.BEGINNING)
            {
                afterEffect = () => {
                    sendMessage({
                        msg: "SET_CLIENT_STATUS_PLAYING"
                    });
                };
            }
        }


        previousEffect();
        let result = next(action);
        afterEffect();
        return result;
    };

};

export default reportToWebsocket;