import React from 'react';
import useTweenedProp from 'Hooks/useTweenedProp';
import PropTypes from 'prop-types';

import './style.scss';

var test = {
    a: 0
};

var Score = function(props)
{
    const score = useTweenedProp(props.score, {
        duration: (props.score === 0) ? 0 : 2250,
        autoplay: false,
        easing: "easeInCirc"
    });

    return (
        <div className="score">
            SCORE {Math.floor(score)}
        </div>
    );
};

Score.propTypes = {
    score: PropTypes.number.isRequired
};

export default Score;