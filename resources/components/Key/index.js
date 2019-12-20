import React from 'react';
import PropTypes from 'prop-types'

import './style.scss';

var Key = function(props)
{
    let style = {};
    if(props.keyName === "ENTER" || props.keyName === "BACK")
    {
        style = {
            flexGrow : 0
        };
    }

    return (
        <div className="key" style={style} onTouchStart={() => props.onTouch(props.keyName)}>

            {/* <div className="key-trigger-zone"
                onTouchStart={() => props.onTouch(props.keyName)}
            ></div> */}

            {props.keyName}
        </div>
    );
};

Key.propTypes = {
    onTouch: PropTypes.func.isRequired,
    keyName: PropTypes.string
};

export default Key;