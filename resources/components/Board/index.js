import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from 'Actions';
import * as gameConst from 'Constants/GameConst';

import './style.scss';

import Flash from 'Components/Flash';
import WordGrid from 'Components/WordGrid';
import InputViewer from 'Components/InputViewer';

var Board = function(props)
{
    const dispatch = useDispatch();
    const gameInfos = useSelector(state => state.gameInfos);
    const words = useSelector(state => state.words);
    const wordPool = useSelector(state => state.wordPool);
    const wordPoolLength = useSelector(state => state.wordPool.length);
    const input = useSelector(state => state.input);

    const params = useRef({
        wordPool,
        speed: gameInfos.speed
    });
    params.current.wordPool = wordPool;
    params.current.speed = gameInfos.speed;

    // Intializing words list and getting word pool from API.
    useEffect(() => {

        let nb = (gameInfos.gameType === gameConst.SOLO) ? 15 : 8;
        dispatch(actions.initializeWords(nb));

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                if (xhr.status === 200)
                {
                    let wordPool = JSON.parse(xhr.responseText);
                    dispatch(actions.setWordPool(wordPool));
                    gameInfos.status = gameConst.PLAYING;
                    dispatch(actions.setGameInfos(gameInfos));
                } else 
                {
                    console.error('La requête wordPool n\'a pas aboutie !')
                }
            }
        };
        xhr.open('GET', './wordsPool.json');
        xhr.send();
    }, []);

    // Setting the addWord process and cleaning it.
    useEffect(() => {
        if(gameInfos.status === gameConst.BEGINNING)
        {
            return;
        }

        let processId = setInterval(createWord.bind(this, params), gameInfos.speed[0]);
        return () => {
            clearInterval(processId);
        }
    }, [gameInfos.speed[0], gameInfos.status]);



    // Handle word timeout effect.
    const handleWordEscape = (id) => {
        dispatch(actions.deleteWord(id));
        dispatch(actions.adjustLife(-5));
    };

    // Create new word and add it to the store.
    let createWord = (params) => {
        let {wordPool, speed} = {...params.current};

        let newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        let timer = speed[1];

        dispatch(actions.addWord(newWord, timer));
    };


    return (
        <div id="board">
            <div className="board-container">
                <WordGrid words={words} onWordEscape={handleWordEscape}/>
                <InputViewer input={input}/>
            </div>
        </div>
    );
};

export default Board;