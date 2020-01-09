const WebSocket = require('ws');
const serverInfos = require('../env.json').webSocket;

const wss = new WebSocket.Server({
    port: serverInfos.port
}, () => {
    console.log('server launched');
});

wss.on('connection', function handleConnection(ws) {
    console.log('new connection');
    ws.send('Hi User !');
});