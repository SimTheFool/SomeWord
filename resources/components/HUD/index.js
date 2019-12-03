import React from 'react';
import './style.scss';

import Score from 'Components/Score';
import Chain from 'Components/Chain';
import Pseudo from 'Components/Pseudo';
import Lifebar from 'Components/Lifebar';

var HUD = function(props)
{
    return (
        <div id="HUD">
            <div className="HUD-container">
                <Lifebar/>
                <Pseudo/>
                <Chain/>
                <Score/>
            </div>
        </div>
    );
}

export default HUD;