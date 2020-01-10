import React, {useEffect, useRef} from 'react';
import Env from 'Env';

var WSConnection = function ()
{

    const connection = useRef(null);

    useEffect(() => {
        connection.current = new WebSocket(`ws://${Env.webSocket.host}:${Env.webSocket.port}`);

        connection.current.onmessage = (e) => {
        console.log(e.data);
        };

    }, []);


    return null;
};

export default WSConnection;