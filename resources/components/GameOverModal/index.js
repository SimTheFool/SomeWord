import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';

import './style.scss';

function GameOverModal(props)
{
    const dispatch = useDispatch();
    const gameInfos = {...useSelector(state => state.gameInfos)};
    const userInfos = {...useSelector(state => state.userInfos)};

    let timeElapsed = (userInfos.endTime - userInfos.startTime)/1000;
    timeElapsed = `${Math.floor(timeElapsed/60)} min ${Math.floor(timeElapsed % 60)} sec`;

    const handlePlayAgain = () => {
        dispatch(actions.setStatus(gameConst.BEGINNING));
    };

    const handleBackToHome = () => {
        dispatch(actions.setStatus(gameConst.NOT_PLAYING));
    };


    return(
        <div id="gameover-modal">
            <div id="gameover-title">
                Game Over
            </div>

            <div id="gameover-recap">
                <ul className="gameover-list">
                    <li className="gameover-item gameover-pseudo">
                        {userInfos.pseudo}
                    </li>
                    <li className="gameover-item">
                        Best chain : {userInfos.bestChain}
                    </li>
                    <li className="gameover-item">
                        Typos : {userInfos.typos}
                    </li>
                    <li className="gameover-item">
                        {timeElapsed}
                    </li>
                    <li className="gameover-item">
                        Speed reached : {userInfos.bestSpeed}
                    </li>
                </ul>
            </div>

            <div className="gameover-button">
                <button onClick={handlePlayAgain}>
                    Play Again ?
                </button>
            </div>
            <div className="gameover-button">
                <button onClick={handleBackToHome}>
                    Back to home
                </button>
            </div>
        </div>
    );
}

export default GameOverModal;