import React from 'react';
import useTweenedProp from 'Hooks/useTweenedProp';
import Animator from 'Utils/Animator';
import PropTypes from 'prop-types';

import './style.scss';

var Lifebar = function(props)
{
    const life =  useTweenedProp(props.life, {
        duration: 1000,
        autoplay: false,
        easing: "linear"
    });

    let style = {
        height: `${life}%`
    };

    return (
        <div className="lifebar">
            <div style={style}></div>
        </div>
    );
};

Lifebar.propTypes = {
    life: PropTypes.number.isRequired
};

export default Lifebar;