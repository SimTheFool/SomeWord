import {useState, useEffect} from 'react';
import anime from 'animejs';

const useTweenedProp = (prop, config) => {

    const [value, setValue] = useState(prop)
    const current = {
        value: value
    };

    const tween = anime({
        targets: current,
        value: prop,
        update: () => {
            setValue(current.value);
        },
        complete: () => {
            setValue(prop);
        },
        ...config
    });

    useEffect(() => {
        if(prop === value)
        {
            return;
        }

        tween.play();

        return () => {
            tween.pause();
        }
    }, [prop]);

    return value;
};

export default useTweenedProp;