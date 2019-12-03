import React from 'react';
import './style.scss';

import Key from 'Components/Key';

var InputText = function(props)
{
    return (
        <div id="input-text">
            <div id="keyboard">
                <div className="keyboard-line">
                    <Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/>
                </div>
                <div className="keyboard-line">
                    <Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/>
                </div>
                <div className="keyboard-line">
                    <Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/><Key/>
                </div>
            </div>
        </div>
    );
}

export default InputText;