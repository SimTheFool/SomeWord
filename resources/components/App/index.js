import React, {useEffect, useRef} from 'react';
import {isMobile} from 'mobile-device-detect';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from 'Actions';
import * as gameConst from 'Constants/GameConst';

import './style.scss';

import HUD from 'Components/HUD';
import Board from 'Components/Board';
import InputText from 'Components/InputText';
import Home from 'Components/Home';
import GameOverModal from 'Components/GameOverModal';

var App = function()
{
    const gameInfos = useSelector(state => state.gameInfos);
    const dispatch = useDispatch();

    // Registering device type.
    useEffect(() => {
        gameInfos.device = (isMobile) ? gameConst.ON_MOBILE : gameConst.ON_DESKTOP;
        dispatch(actions.setGameInfos({...gameInfos}));
    }, []);

    // Recording time on begin and end for the current game.
    useEffect(() => {
        if(gameInfos.status === gameConst.PLAYING)
        {
            dispatch(actions.setStartTime(new Date()));
        }

        if(gameInfos.status === gameConst.WAITING)
        {
            if(gameInfos.gameType === gameConst.SOLO)
            {
                dispatch(actions.setStatus(gameConst.BEGINNING));
            }

            if(gameInfos.gameType === gameConst.MULTI)
            {
                // coupling with another user through WS, then BEGINNING.
            }
        }

        if(gameInfos.status === gameConst.WINNING || gameInfos.status === gameConst.LOOSING)
        {
            dispatch(actions.setEndTime(new Date()));
        }
    }, [gameInfos.status]);

    let app;
    if(gameInfos.status === gameConst.NOT_PLAYING || gameInfos.status === gameConst.WAITING)
    {
        app = <Home/>
    }
    else
    {
        let modal = (gameInfos.status === gameConst.WINNING || gameInfos.status === gameConst.LOOSING) ? <GameOverModal/> : null;
        app = <><HUD/><Board/><InputText/>{modal}</>;
    }

    return (
        <>
            {app}
        </>
    );
}

export default App;