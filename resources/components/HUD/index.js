import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';

import './style.scss';

import Score from 'Components/Score';
import Chain from 'Components/Chain';
import Pseudo from 'Components/Pseudo';
import Lifebar from 'Components/Lifebar';

var HUD = function()
{
    const dispatch = useDispatch();
    const chain = useSelector(state => state.chain);
    const userBestChain = useSelector(state => state.userInfos.bestChain);
    const pseudo = useSelector(state => state.userInfos.pseudo);
    const score = useSelector(state => state.score);
    const life = useSelector(state => Math.max(0, state.life));

    const triggerGameOver = function() {
        dispatch(actions.setStatus(gameConst.WINNING));
        dispatch(actions.deleteAllWords());
    };

    // Trigger game over when no more life.
    useEffect(() => {
        if(life <= 0)
        {
            triggerGameOver();
        }
    }, [life]);

    // Set user best chain for the current game.
    useEffect(() => {
        if(chain > userBestChain)
        {
            dispatch(actions.setBestChain(chain));
        }
    }, [chain]);

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