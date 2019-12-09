import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

var Lifebar = function(props)
{
    let style = {
        height: `${props.life}%`
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