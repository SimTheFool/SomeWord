import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from 'Actions';
import * as gameConst from 'Constants/GameConst';

import './style.scss';

import Flash from 'Components/Flash';
import WordGrid from 'Components/WordGrid';
import InputViewer from 'Components/InputViewer';
import useRefCallback from 'Hooks/useRefCallback';

var Board = function(props)
{
    const dispatch = useDispatch();
    const gameInfos = {...useSelector(state => state.gameInfos)};
    const words = useSelector(state => state.words);
    const wordPool = useSelector(state => state.wordPool);
    const wordPoolLength = useSelector(state => state.wordPool.length);
    const input = useSelector(state => state.input);

    // Create new word and add it to the store.
    const handleCreateWord = function() {
        dispatch(actions.addWord(wordPool, gameInfos.speed[1]));
    };
    let handleCreateWordRef = useRefCallback(handleCreateWord);

    // Handle word timeout effect.
    const handleWordEscape = (id) => {
        dispatch(actions.deleteWord(id));
        dispatch(actions.adjustLife(-5));
    };


    // Intializing words list and getting word pool from API.
    useEffect(() => {
        if(gameInfos.status !== gameConst.BEGINNING)
        {
            return;
        }

        dispatch(actions.initializeCurrentGame(gameInfos));

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
    }, [gameInfos.status]);

    // Setting the addWord process and cleaning it.
    useEffect(() => {
        let shouldSetInterval = gameInfos.status === gameConst.PLAYING;
        if(!shouldSetInterval){return;}

        let processId = setInterval(handleCreateWordRef, gameInfos.speed[0]);
        
        return () => {
            if(!shouldSetInterval){return;}
            clearInterval(processId);
        }
    }, [gameInfos.speed[0], gameInfos.status]);


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