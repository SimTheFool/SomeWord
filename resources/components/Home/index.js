import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';

import './style.scss';

import CarretCursor from 'Components/CarretCursor';
import AppButton from 'Components/AppButton';
import NeonText from 'Components/NeonText';


var Home = function(props)
{
    const gameInfos = {...useSelector(state => state.gameInfos)};
    const userPseudo = useSelector(state => state.userInfos.pseudo);
    const dispatch = useDispatch();

    const [pseudo, setPseudo] = useState(userPseudo);
    const handlePseudoChange = (e) => {
        let value = e.currentTarget.value;
        value = value.replace( /./gi, (match) => {
            return match.toUpperCase();
        });

        setPseudo(value);
    };

    const [keyboard, setKeyboard] = useState("azerty");
    const handleKeyboardChange = (e) => {
        setKeyboard(e.currentTarget.value);
    };

    const [gameType, setGameType] = useState(gameConst.SOLO);
    const handleGameTypeChange = (e) => {
        setGameType(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        gameInfos.keyboard = (keyboard === "azerty") ? gameConst.KEYBOARD_AZERTY : gameConst.KEYBOARD_QWERTY;
        gameInfos.gameType = gameType;
        gameInfos.status = gameConst.BEGINNING;
        dispatch(actions.setGameInfos(gameInfos));
        dispatch(actions.setPseudo(pseudo.toUpperCase()));
    };

    return (
        <div id="home">
            <div id="home-container">
                <div id="home-title">
                    >SOME<NeonText>W</NeonText>ORD
                    <div id="home-subtitle">A TYPING SCORING GAME <CarretCursor/></div>
                </div>

                <form onSubmit={handleSubmit} spellCheck="false">
                    <div className="pseudo-input">
                        <input id="pseudo" type="text" placeholder="YOUR PSEUDO" value={pseudo} onChange={handlePseudoChange} autoFocus/>
                    </div>

                    <div className="radios">
                        <div className="radio-input">
                            <div>
                                <input type="radio" id="solo" name="game-type" value={gameConst.SOLO} checked={gameType === gameConst.SOLO} onChange={handleGameTypeChange}/>
                                <label htmlFor="solo">Solo</label>
                            </div>
                            
                            {/* <div>
                                <input type="radio" id="multi" name="game-type" value={gameConst.MULTI} checked={gameType === gameConst.MULTI} onChange={handleGameTypeChange} />
                                <label htmlFor="multi">Multi</label>
                            </div>        */}              
                        </div>

                        <div className="radio-input" hidden={gameInfos.device === gameConst.ON_DESKTOP}>
                            <div>
                                <input type="radio" id="azerty" name="keyboard-type" value="azerty" checked={keyboard === "azerty"} onChange={handleKeyboardChange}/>
                                <label htmlFor="azerty">AZERTY</label>
                            </div>
                            
                            <div>
                                <input type="radio" id="qwerty" name="keyboard-type" value="qwerty" checked={keyboard === "qwerty"} onChange={handleKeyboardChange}/>
                                <label htmlFor="qwerty">QWERTY</label>
                            </div>
                        </div>
                    </div>

                    <AppButton> Jouer </AppButton>

                </form>
                
                <div id="home-infos">
                    <span hidden={gameInfos.device === gameConst.ON_DESKTOP}>/!\ For a better user experience, we recommend playing in portrait mode.</span>
                </div>
            </div>
        </div>
    );
}

export default Home;