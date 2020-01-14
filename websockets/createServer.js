import WebSocket from 'ws';
import Env from '../env.json'

import {dispatch, getState} from './store';
import * as actionCreators from './actionCreators';

import types from './constants/messageTypes';
import serverConst from './constants/serverConst';

var createServer = function()
{
    const wss = new WebSocket.Server({
        port: Env.webSocket.port,
        noServer: true,
        clientTracking: true
    });
    
    wss.on('connection', (ws) => {
    
        dispatch(actionCreators.addClient(ws));
    
        ws.on('message', (e) => {

            let data = JSON.parse(e);
            
            switch(data.msg)
            {
                case types.SET_CLIENT_STATUS_PLAYING:
                    dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_PLAYING));
                    break;

                case types.SET_CLIENT_STATUS_WAITING:
                    dispatch(actionCreators.setClientStatus(ws, serverConst.STATUS_WAITING));
                    break;

                case types.SET_CLIENT_NOT_PLAYING:
                    dispatch(actionCreators.setClientStatus(ws, serverConst.NOT_PLAYING));
                    break;

                case types.PAIR_CLIENT:
                    dispatch(actionCreators.pairClient(ws));
                    break;

                case types.FREE_CLIENT:
                    dispatch(actionCreators.freeClient(ws));
                    break;

                default:
                    return;
            }

        });

    });

};

export default createServer;