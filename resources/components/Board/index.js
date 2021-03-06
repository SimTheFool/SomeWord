import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useRefCallback from 'Hooks/useRefCallback';
import * as actions from 'Actions';
import * as gameConst from 'Constants/GameConst';

import './style.scss';

import WordGrid from 'Components/WordGrid';
import InputViewer from 'Components/InputViewer';


var Board = function(props)
{
    const dispatch = useDispatch();
    const gameInfos = useSelector(state => state.gameInfos);
    const speedIndex = useSelector(state => state.gameInfos.speed);
    const words = useSelector(state => state.words);
    const wordPool = useSelector(state => state.wordPool);
    const input = useSelector(state => state.input);
    const createWordPID = useRef(null);

    const opponentWords = useSelector(state => state.opponentInfos.words);

    const createWord = () => {

        const effectiveWords = words.filter((word) => {
            return word.value !== "";
        });

        const delay = gameConst.MIN_SPAWN_DELAY + (effectiveWords.length / words.length) * (gameConst.MAX_SPAWN_DELAY - gameConst.MIN_SPAWN_DELAY);

        const PID = setTimeout(() => {
            dispatch(actions.addWord(wordPool, gameConst.SPEEDS[speedIndex].unspawnDelay + delay));
            createWordRef();
        }, delay);

        createWordPID.current = PID;
    };
    const createWordRef = useRefCallback(createWord);

    const cleanCreateWordRef = useRefCallback(() => {
        clearTimeout(createWordPID.current);
    });

    // Handle word timeout effect.
    const handleWordEscape = (id) => {
        dispatch(actions.deleteWord(id));
        dispatch(actions.adjustLife(-5));
    };

    const handleWordValidated = (id, length, chain) => {
        dispatch(actions.deleteWord(id));
        let scoreGain = length * 10 * (1 + gameConst.CHAIN_FACTOR(chain));
        dispatch(actions.incrementScore(scoreGain));
        dispatch(actions.incrementChain());
    };

    // Intializing words list and getting word pool from API.
    useEffect(() => {
        if(gameInfos.status !== gameConst.BEGINNING)
        {
            return;
        }

        dispatch(actions.initializeCurrentGame(gameInfos));
        dispatch(actions.setStatus(gameConst.PLAYING));
    }, [gameInfos.status]);

    // Setting the addWord process.
    useEffect(() => {

        if(gameInfos.status === gameConst.PLAYING)
        {
            createWordRef();

            return () => {
                cleanCreateWordRef();
            };
        }

    }, [gameInfos.status]);


    // Setting the change speed effect. This effect must be cleared and set again after each speed changing.
    useEffect(() => {

        if(gameInfos.status === gameConst.PLAYING && speedIndex < gameConst.SPEEDS.length-1)
        {
            let changeSpeedPID = setTimeout(() => {
                dispatch(actions.setSpeed(speedIndex + 1));                
            }, gameConst.CHANGE_SPEED_DELAY);
    
            return () => {
                clearTimeout(changeSpeedPID);
            };
        }

    }, [speedIndex, gameInfos.status])

    // Recording best speed.
    useEffect(() =>{
        dispatch(actions.setBestSpeed(gameConst.SPEEDS[speedIndex].name));
    }, [speedIndex]);




    let opponent = null;
    if(gameInfos.gameType === gameConst.MULTI)
    {
        opponent = (
            <div className="board-container border-left">
                <WordGrid class="marginTest" words={opponentWords} onWordEscape={() => {}} onWordValidated={() => {}}/>
            </div>
        );
    }

    return (
        <div id="board">
            <div className="board-container">
                <WordGrid words={words} onWordEscape={handleWordEscape} onWordValidated={handleWordValidated}/>
                <InputViewer input={input}/>
            </div>
            {opponent}
        </div>
    );
};

export default Board;