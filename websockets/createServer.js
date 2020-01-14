import WebSocket from 'ws';
import Env from '../env.json'

import store from './store';
import * as actionCreators from './actionCreators';

import * as types from './constants/messageTypes';
import * as serverConst from './constants/serverConst';

var createServer = function()
{
    const wss = new WebSocket.Server({
        port: Env.webSocket.port,
        noServer: true,
        clientTracking: true
    });
    
    wss.on('connection', (ws) => {
    
        store.dispatch(actionCreators.addClient(ws));
    
        ws.on('message', (e) => {

            let data = JSON.parse(e);
            
            switch(data.msg)
            {
                case types.SET_CLIENT_STATUS_PLAYING:
                    store.dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_PLAYING));
                    break;

                case types.SET_CLIENT_STATUS_WAITING:
                    store.dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_WAITING));
                    break;

                case types.SET_CLIENT_STATUS_NOT_PLAYING:
                    store.dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_NOT_PLAYING));
                    break;

                case types.PAIR_CLIENT:
                    store.dispatch(actionCreators.pairClient(ws));
                    break;

                case types.FREE_CLIENT:
                    store.dispatch(actionCreators.freeClient(ws));
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