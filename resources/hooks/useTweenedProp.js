import {useState, useRef, useEffect} from 'react';
import anime from 'animejs';

const useTweenedProp = (prop, config, instantValue = null) => {

    const [value, setValue] = useState(prop)
    const tempValue = {
        current: value
    };

    useEffect(() => {

        if(prop === value)
        {
            return;
        }

        if(prop === instantValue)
        {
            setValue(prop);
            return;
        }

        const tween = anime({
            targets: tempValue,
            current: prop,
            autoplay: false,
            update: () => {
                setValue(tempValue.current);
            },
            complete: () => {
                setValue(prop);
            },
            ...config
        });

        tween.play();

        return () => {
            tween.pause();
        }
    }, [prop]);

    return value;
};

export default useTweenedProp;