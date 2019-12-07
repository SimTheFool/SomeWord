import {useRef} from 'react';


const useRefCallback = (callback) => {

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    return function() {
        var args = Array.from(arguments);
        let callback = callbackRef.current;

        callback.apply(null, args);
    }
};

export default useRefCallback;