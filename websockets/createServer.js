import WebSocket from 'ws';
import Env from '../env.json'

import store from './store';
import * as actionCreators from './actionCreators';

import * as types from './constants/messageTypes';
import * as serverConst from './constants/serverConst';

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

            result.forEach((ws) => {
                sendMessage(ws, {
                    msg: types.START_PLAYING
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
                /* case types.SET_CLIENT_STATUS_PLAYING:
                    store.dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_PLAYING));
                    break;

                case types.SET_CLIENT_STATUS_WAITING:
                    store.dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_WAITING));
                    break;

                case types.SET_CLIENT_STATUS_NOT_PLAYING:
                    store.dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_NOT_PLAYING));
                    break; */

                case types.STACK_IN_PAIR_QUEUE:
                    store.dispatch(actionCreators.stackInPairQueue(ws));
                    break;

                case types.FREE_FROM_PAIR_QUEUE:
                    store.dispatch(actionCreators.freeFromPairQueue(ws));
                    break;

                case types.UNPAIR:
                    store.dispatch(actionCreators.unpair(ws));
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

            console.log(store.state);
            console.log("**//**");
        });

        ws.on('close', (e) => {
            store.dispatch(actionCreators.removeClient(ws));
        });

    });

};

export default createServer;