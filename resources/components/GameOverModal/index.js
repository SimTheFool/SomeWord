import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';

import './style.scss';

import AppButton from 'Components/AppButton';
import NeonText from 'Components/NeonText';

function GameOverModal(props)
{
    const dispatch = useDispatch();
    const status = useSelector( state => state.gameInfos.status);
    const userInfos = {...useSelector(state => state.userInfos)};

    let timeElapsed = (userInfos.endTime - userInfos.startTime)/1000;
    timeElapsed = (
        <>
            <span className="gameover-value">{Math.floor(timeElapsed/60)}</span> min &nbsp;
            <span className="gameover-value">{Math.floor(timeElapsed % 60)}</span> sec
        </>
    );

    const handlePlayAgain = () => {
        dispatch(actions.setStatus(gameConst.WAITING_PLAY_AGAIN));
    };

    const handleBackToHome = () => {
        dispatch(actions.setStatus(gameConst.NOT_PLAYING));
    };


    let playAgain;
    switch(status)
    {
        case gameConst.WAITING_PLAY_AGAIN:
            playAgain = (<><AppButton onClick={handlePlayAgain}>Play again ?</AppButton> Waiting for opponent</>)
            break;

        case gameConst.ABORT_PLAY_AGAIN:
            playAgain = "Your opponent has gone";
            break;

        default:
            playAgain = (<AppButton onClick={handlePlayAgain}>Play again ?</AppButton>)
    }


    return(
        <div id="gameover-modal">
            <div id="gameover-title">
                GAME <NeonText>O</NeonText>VER
            </div>

            <div id="gameover-recap">
                <ul className="gameover-list">
                    <li className="gameover-item gameover-pseudo">
                        {userInfos.pseudo}
                    </li>
                    <li className="gameover-item">
                        Chain : <span className="gameover-value">{userInfos.bestChain}</span>
                    </li>
                    <li className="gameover-item">
                        Typos : <span className="gameover-value">{userInfos.typos}</span>
                    </li>
                    <li className="gameover-item">
                        {timeElapsed}
                    </li>
                    <li className="gameover-item">
                        Speed reached : <span className="gameover-value">{userInfos.bestSpeed}</span>
                    </li>
                </ul>
            </div>

            <div className="gameover-button-left gameover-button">
                {playAgain}
            </div>
            <div className="gameover-button-right gameover-button">
                <AppButton onClick={handleBackToHome}>Back to home</AppButton>
            </div>
        </div>
    );
}

export default GameOverModal;