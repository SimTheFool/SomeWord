import React, { useState } from 'react';
import PropTypes from 'prop-types'

import './style.scss';

import NeonText from 'Components/NeonText';

var Key = function(props)
{
    const [showInfo, setShowInfo] = useState(false);
    let symbol = "";

    switch(props.keyName)
    {
        case "ENTER":
            symbol = "↲";
            break;
        case "BACK":
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
        <div className="key" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
            {
                showInfo ?
                <div className="key-info">
                    <NeonText>{symbol ? symbol : props.keyName}</NeonText>
                </div> :
                null
            }
            <span className="key-box">
                {symbol ? symbol : props.keyName}
            </span>
        </div>
    );
};

Key.propTypes = {
    onTouch: PropTypes.func.isRequired,
    keyName: PropTypes.string
};

export default Key;