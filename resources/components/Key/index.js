import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'

import './style.scss';

import NeonText from 'Components/NeonText';

var Key = function(props)
{
    const [showInfo, setShowInfo] = useState(false);
    const PID = useRef(null);

    const handleTouchStart = (e) => {
        e.preventDefault();
        if(props.keyData.name === "EMPTY")
        {
            return;
        }

        props.onTouch(props.keyData.name);
        clearTimeout(PID.current);
        setShowInfo(true);
    };

    const handleTouchEnd = (e) => {
        PID.current = setTimeout(() => {
            setShowInfo(false);
        }, 150);
    };

    let char = props.keyData.symbol !== undefined ? props.keyData.symbol : props.keyData.name;

    let info = showInfo ?
        <div className="key-info">
            <NeonText>{char}</NeonText>
        </div> :
        null;


    return (
        <div className="key" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
            
            {info}

            <span className="key-box" onTouchStart={() => {
                // "pointer-events : none" wasn't enought to disable touch event on mobile devices.
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }}>
                {char}
            </span>
        </div>
    );
};

Key.propTypes = {
    onTouch: PropTypes.func.isRequired,
    keyData: PropTypes.object.isRequired
};

export default Key;