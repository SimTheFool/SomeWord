import React, {useEffect} from 'react';
import {isMobile} from 'mobile-device-detect';
import {useSelector, useDispatch} from 'react-redux';
import {setGameInfos} from 'Actions';
import * as gameConst from 'Constants/GameConst';

import './style.scss';

import HUD from 'Components/HUD';
import Board from 'Components/Board';
import InputText from 'Components/InputText';
import Home from 'Components/Home';

var App = function(props)
{
    const gameInfos = useSelector(state => state.gameInfos);
    const dispatch = useDispatch();

    useEffect(() => {
        gameInfos.device = (isMobile) ? gameConst.ON_MOBILE : gameConst.ON_DESKTOP;
        dispatch(setGameInfos(gameInfos));
    }, []);

    const app = (gameInfos.status === gameConst.NOT_PLAYING ) ? <Home/> : <><HUD/><Board/><InputText/></>;

    return (
        <>
            {app}
        </>
    );
}

export default App;