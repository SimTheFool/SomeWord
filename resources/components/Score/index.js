import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

var Score = function(props)
{
    return (
        <div className="score">
            SCORE {props.score}
        </div>
    );
};

Score.propTypes = {
    score: PropTypes.number.isRequired
};

export default Score;