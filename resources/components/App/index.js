import React, {useEffect} from 'react';
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

var App = function(props)
{
    const gameInfos = {...useSelector(state => state.gameInfos)};
    const dispatch = useDispatch();

    // Registering device type.
    useEffect(() => {
        gameInfos.device = (isMobile) ? gameConst.ON_MOBILE : gameConst.ON_DESKTOP;
        dispatch(actions.setGameInfos(gameInfos));
    }, []);

    // Recording time on begin and end for the current game.
    useEffect(() => {
        if(gameInfos.status === gameConst.PLAYING)
        {
            dispatch(actions.setStartTime(new Date()));
        }

        if(gameInfos.status === gameConst.WINNING || gameInfos.status === gameConst.LOOSING)
        {
            dispatch(actions.setEndTime(new Date()));
        }
    }, [gameInfos.status]);

    let app;
    if(gameInfos.status === gameConst.NOT_PLAYING)
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