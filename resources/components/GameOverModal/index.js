import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';

import './style.scss';

function GameOverModal(props)
{
    const dispatch = useDispatch();
    const gameInfos = {...useSelector(state => state.gameInfos)};

    const handlePlayAgain = () => {
        gameInfos.status = gameConst.BEGINNING;
        dispatch(actions.setGameInfos(gameInfos));
    };

    const handleBackToHome = () => {
        gameInfos.status = gameConst.NOT_PLAYING;
        dispatch(actions.setGameInfos(gameInfos));
    };


    return(
        <div id="gameover-modal">
            <div id="gameover-title">
                Game Over
            </div>

            <div id="gameover-recap">
                <ul className="gameover-list">
                    <li className="gameover-item gameover-pseudo">
                        Brenda
                    </li>
                    <li className="gameover-item">
                        Best chain: 5
                    </li>
                    <li className="gameover-item">
                        Typos: 15
                    </li>
                    <li className="gameover-item">
                        Time elapsed: 12:23
                    </li>
                    <li className="gameover-item">
                        Speed reached: EXTREME
                    </li>
                </ul>
            </div>

            <button onClick={handlePlayAgain}>
                Play Again ?
            </button>
            <button onClick={handleBackToHome}>
                Back to home
            </button>
        </div>
    );
}

export default GameOverModal;