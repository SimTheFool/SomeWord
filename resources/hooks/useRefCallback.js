import {useRef} from 'react';


const useRefCallback = (callback, thisObject) => {

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    return function() {
        var args = Array.from(arguments);
        let callback = callbackRef.current;

        return callback.apply(thisObject, args);
    };
};

export default useRefCallback;