import {useState} from 'react';
import {useSelector, useStore} from 'react-redux';
import useRefCallback from 'Hooks/useRefCallback';


const useSubscriber = (selectStateCb, listener, defaultPrev = null) => {
    const store = useStore();

    const [previousState, setPreviousState] = useState(defaultPrev);
    const currentState = useSelector(selectStateCb);

    const listenerRef = useRefCallback(() => {
        setPreviousState(currentState);
        listener.call(null, previousState, currentState);
    });

    return () => {
        const unsubscribe = store.subscribe(listenerRef);
        return unsubscribe;
    };
};

export default useSubscriber;