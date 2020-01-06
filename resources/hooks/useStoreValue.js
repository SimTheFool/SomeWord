import {useStore} from 'react-redux';

const useStoreValue = (cb) => {
    const store = useStore().getState();
    const value = cb(store);

    return value;
};

export default useStoreValue;