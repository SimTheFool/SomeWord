import React, { useState } from 'react';
import PropTypes from 'prop-types'

import './style.scss';

import NeonText from 'Components/NeonText';

var Key = function(props)
{
    const [showInfo, setShowInfo] = useState(false);
    let className = "";
    let symbol = "";

    switch(props.keyName)
    {
        case "ENTER":
            className = "key-special";
            symbol = "↲";
            break;
        case "BACK":
            className = "key-special";
            symbol = "←";
            break;
        default:
            break;
    }

    const handleTouchStart = (e) => {
        props.onTouch(props.keyName);
        setShowInfo(true);
    };

    const handleTouchEnd = (e) => {
        setShowInfo(false);
    };

    return (
        <div className={`key ${className}`} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
            {
                showInfo ?
                <div className="key-info">
                    <NeonText>{symbol ? symbol : props.keyName}</NeonText>
                </div> :
                null
            }
            {symbol ? symbol : props.keyName}
        </div>
    );
};

Key.propTypes = {
    onTouch: PropTypes.func.isRequired,
    keyName: PropTypes.string
};

export default Key;