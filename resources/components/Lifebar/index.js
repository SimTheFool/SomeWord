import React, {useEffect} from 'react';
import useTweenedProp from 'Hooks/useTweenedProp';
import useAnimator from 'Hooks/useAnimator';
import PropTypes from 'prop-types';

import './style.scss';

var Lifebar = function(props)
{
    const [animator, nodeRef] = useAnimator();

    const tweenedLife =  useTweenedProp(props.life, {
        duration: 1000,
        autoplay: false,
        easing: "easeOutCirc"
    });

    const animLifeDecrease = {
        duration: 750,
        name: "lifebar_decrement",
        easing: "ease-in",
        direction: "alternate"
    };

    const animBlink = {
        duration: 1000,
        name: "lifebar_blink",
        easing: "ease-in",
        iteration: "infinite",
        direction: "alternate"
    };

    useEffect(() => {
        animator.add(animBlink);
    }, []);

    useEffect(() => {
        if(props.life >= 100)
        {
            return;
        }
        animator.add(animLifeDecrease);
    }, [props.life]);

    let style = {
        height: `${tweenedLife}%`
    };

    return (
        <div className="lifebar">
            <div style={style} ref={nodeRef}></div>
        </div>
    );
};

Lifebar.propTypes = {
    life: PropTypes.number.isRequired
};

export default Lifebar;