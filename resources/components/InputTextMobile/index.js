import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Key from 'Components/Key';

var InputTextMobile = function(props)
{
    let keyboard = props.keyboard;

    const handleTouch = (keyName) => {
        switch(keyName)
        {
            case "ENTER":
                props.handleEnterKey();
                break;

            case "BACK":
                props.handleBackspaceKey();
                break;

            default:
                props.handleLetterKey(keyName);
        }
    };

    keyboard = keyboard.map((row, index) => {

        let keys = row.map((keyName, index) => {
            return <Key keyName={keyName} onTouch={handleTouch} key={index}/>
        })

        return (
            <div className="keyboard-line" key={index}>
                {keys}
            </div>
        )
    });

    return (
        <div id="input-text-mobile">
            <div id="keyboard">
                {keyboard}
            </div>
        </div>
    );
};

InputTextMobile.propTypes = {
    handleLetterKey: PropTypes.func.isRequired,
    handleBackspaceKey: PropTypes.func.isRequired,
    handleEnterKey: PropTypes.func.isRequired
};

export default InputTextMobile;