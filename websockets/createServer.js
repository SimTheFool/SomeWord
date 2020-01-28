import WebSocket from 'ws';
import Env from '../env.json';
import {rword} from 'rword';

import debug from './debug';
import store from './store';
import * as actionCreators from './actionCreators';
import * as types from './constants/messageTypes';

function sendMessage (ws, msg)
{
    ws.send(JSON.stringify(msg));
};

var createServer = function()
{
    const wss = new WebSocket.Server({
        port: Env.webSocket.port,
        noServer: true,
        clientTracking: true
    });

    setInterval(() => {
        store.dispatch(actionCreators.pairClientsProcess(), (result) => {
            if(!result)
            {
                return;
            }

            result.forEach((user) => {
                user.playAgain = false;
                sendMessage(user.ws, {
                    msg: types.START_PLAYING,
                    payload: rword.generate(300, {
                        length: '3-12',
                        capitalize: 'all'
                    })
                });
            });
        });
    }, 1000);
    
    wss.on('connection', (ws) => {
    
        store.dispatch(actionCreators.addClient(ws));
    
        ws.on('message', (e) => {

            let data = JSON.parse(e);
            
            switch(data.msg)
            {
                case types.STACK_IN_PAIR_QUEUE:
                    store.dispatch(actionCreators.stackInPairQueue(ws));
                    break;

                case types.WAITING_SOLO_WORD_POOL:
                    sendMessage(ws, {
                        msg: types.START_PLAYING,
                        payload: rword.generate(300, {
                            length: '3-12',
                            capitalize: 'all'
                        })
                    });
                    break;

                case types.FREE_FROM_PAIR_QUEUE:
                    store.dispatch(actionCreators.freeFromPairQueue(ws));
                    break;

                case types.UNPAIR:
                    store.dispatch(actionCreators.unpair(ws), (opponent) => {
                        if(!opponent || !opponent.playAgain)
                        {
                            return;
                        }

                        sendMessage(opponent.ws, {
                            msg: types.ABORT_PLAY_AGAIN
                        });
                    });
                    break;

                case types.SET_CLIENT_PLAY_AGAIN:
                    store.dispatch(actionCreators.setClientPlayAgain(ws), (result) => {
                        if(result === null)
                        {
                            sendMessage(ws, {
                                msg: types.ABORT_PLAY_AGAIN
                            });
                        }
                        else if(result)
                        {
                            result.forEach((user) => {
                                user.playAgain = false;
                                sendMessage(user.ws, {
                                    msg: types.START_PLAYING,
                                    payload: rword.generate(300, {
                                        length: '3-12',
                                        capitalize: 'all'
                                    })
                                });
                            });
                        }
                        else
                        {
                            sendMessage(ws, {
                                msg: types.WAIT_FOR_OPONNENT
                            });
                        }
                    });
                    break;

                case types.SEND_INFOS_TO_OPPONENT:
                    let opponent = store.findUserByWs(ws).pairedWith;
                    if(!opponent)
                    {
                        return;
                    }
                    sendMessage(opponent.ws, {
                        msg: types.RECEIVE_OPPONENT_INFOS,
                        payload: data.payload
                    });
                    break;

                default:
                    console.log("wrong request");
                    return;
            }
        });

        ws.on('close', (e) => {
            store.dispatch(actionCreators.removeClient(ws), (opponent) => {
                if(!opponent)
                {
                    return;
                }

                if(opponent.playAgain)
                {
                    sendMessage(opponent.ws, {
                        msg: types.ABORT_PLAY_AGAIN
                    });
                }

                sendMessage(opponent.ws, {
                    msg: types.FLASH_OPPONENT_DISCONNECTED
                });
            });
        });

    });

};


debug();

export default createServer;