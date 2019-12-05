import React from 'react';
import PropTypes from 'prop-types'

import './style.scss';

var Key = function(props)
{
    return (
        <div className="key"
            onTouchStart={() => props.onTouch(props.keyName)}
        >
            {props.keyName}
        </div>
    );
};

Key.propTypes = {
    onTouch: PropTypes.func.isRequired,
    keyName: PropTypes.string
};

export default Key;