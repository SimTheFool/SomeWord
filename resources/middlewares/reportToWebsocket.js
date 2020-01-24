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

    let getInfosForOpponent = function(state)
    {
        return {
            pseudo: state.userInfos.pseudo,
            chain: state.chain,
            score: state.score,
            life: state.life,
            words: state.words
        };
    };

    connection.onmessage = (e) => {
        let data = JSON.parse(e.data);

        switch(data.msg)
        {
            case "START_PLAYING":
                store.dispatch(actions.setWordPool(data.payload));
                store.dispatch(actions.setStatus(gameConst.BEGINNING));
                break;

            case "RECEIVE_OPPONENT_INFOS":
                store.dispatch(actions.setOpponentInfos(data.payload));
                break;

            case "ABORT_PLAY_AGAIN":
                store.dispatch(actions.setStatus(gameConst.ABORT_PLAY_AGAIN));

            case "FLASH_OPPONENT_DISCONNECTED":
                console.log('Your opponent has gone');
                
            default:
        }
    }

    return next => action => {

        let state = store.getState();
        let previousEffect = () => {};
        let afterEffect = () => {};

        let isMulti = state.gameInfos.gameType === gameConst.MULTI;

        let isChangingStatus = (action.type === types.SET_STATUS) && (action.status !== state.gameInfos.status);

        let isChangingInfosForOpponent = types.CHANGING_INFOS_FOR_OPPONENT_TYPES.some((type) => {
            return (type === action.type);
        });
        
        if(isChangingStatus)
        {
            if(action.status === gameConst.NOT_PLAYING)
            {
                if(isMulti)
                {
                    if(state.gameInfos.status === gameConst.WAITING)
                    {
                        afterEffect = () => {
                            sendMessage({
                                msg: "FREE_FROM_PAIR_QUEUE"
                            });
                        };
                    }
                    else
                    {
                        afterEffect = () => {
                            sendMessage({
                                msg: "UNPAIR"
                            });
                        };
                    }
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
                        sendMessage({
                            msg: "WAITING_SOLO_WORD_POOL"
                        });
                    };
                } 
            }
            else if(action.status === gameConst.WAITING_PLAY_AGAIN)
            {
                if(isMulti)
                {
                    afterEffect = () => {
                        sendMessage({
                            msg: "SET_CLIENT_PLAY_AGAIN"
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
        }

        if(isChangingInfosForOpponent)
        {
            afterEffect = (newState) => {
                sendMessage({
                    msg: "SEND_INFOS_TO_OPPONENT",
                    payload: getInfosForOpponent(newState)
                });
            };
        }


        previousEffect(state);
        let result = next(action);
        afterEffect(store.getState());
        return result;
    };

};

export default reportToWebsocket;