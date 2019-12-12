import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';


import './style.scss';


var Home = function(props)
{
    const gameInfos = {...useSelector(state => state.gameInfos)};
    const userPseudo = useSelector(state => state.userInfos.pseudo);
    const dispatch = useDispatch();

    const [pseudo, setPseudo] = useState(userPseudo);
    const handlePseudoChange = (e) => {
        setPseudo(e.currentTarget.value);
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
        dispatch(actions.setPseudo(pseudo));
    };

    return (
        <div id="home">
            <div id="home-container">
                <div id="home-title">Someword</div>
                <div id="home-subtitle">For a better user experience, we recommand you to play in portrait mode ;)</div>

                <form onSubmit={handleSubmit}>
                    <div className="pseudo-input">
                        <label htmlFor="pseudo">Pseudo :</label>
                        <input id="pseudo" type="text" placeholder="votre pseudo" value={pseudo} onChange={handlePseudoChange}/>
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

                    <button className="submit-button" type="submit"> Jouer </button>

                </form>
            </div>
        </div>
    );
}

export default Home;