import React from 'react';
import {useSelector} from 'react-redux';

import './style.scss';

import Score from 'Components/Score';
import Chain from 'Components/Chain';
import Pseudo from 'Components/Pseudo';
import Lifebar from 'Components/Lifebar';

var HUD = function(props)
{
    const chain = useSelector(state => state.chain);
    const pseudo = useSelector(state => state.userInfos.pseudo);
    const score = useSelector(state => state.score);
    const life = useSelector(state => state.life);

    return (
        <div id="HUD">
            <div className="HUD-container">
                <Lifebar life={life}/>
                <Pseudo pseudo={pseudo}/>
                <Chain chain={chain}/>
                <Score score={score}/>
            </div>
        </div>
    );
}

export default HUD;