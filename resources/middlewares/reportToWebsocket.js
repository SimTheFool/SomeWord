import Env from 'Env';

const reportToWebsocket = function(store) {

    let connection = new WebSocket(`ws://${Env.webSocket.host}:${Env.webSocket.port}`);
    //@TODO handle message reception;

    return next => action => {
        // define dispatch behaviour and websocket reporting
    };

};

export default reportToWebsocket;