const WebSocket = require('ws');
const serverInfos = require('../env.json').webSocket;

const wss = new WebSocket.Server({
    port: serverInfos.port,
    noServer: true,
    clientTracking: true
});

wss.on('connection', (ws) => {

    console.log('nouvelle connection');
});