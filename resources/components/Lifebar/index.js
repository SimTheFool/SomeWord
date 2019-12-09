import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

var Lifebar = function(props)
{
    const life = Math.max(0, props.life)

    useEffect(() => {
        if(life <= 0)
        {
            props.onLifeZero();
        }
    }, [props.life]);

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
    life: PropTypes.number.isRequired,
    onLifeZero: PropTypes.func.isRequired
};

export default Lifebar;