import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addWord, deleteWord, adjustLife, setWordPool} from 'Actions';

import './style.scss';

import Flash from 'Components/Flash';
import WordGrid from 'Components/WordGrid';
import InputViewer from 'Components/InputViewer';

var Board = function(props)
{
    const dispatch = useDispatch();
    const speed = useSelector(state => state.gameInfos.speed);
    const words = useSelector(state => state.words);
    const wordPool = useSelector(state => state.wordPool);
    const input = useSelector(state => state.input);

    const params = useRef({
        words,
        wordPool,
        speed
    });
    params.current.words = words;
    params.current.wordPool = wordPool;
    params.current.speed = speed;

    // Getting word pool from API.
    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                if (xhr.status === 200)
                {
                    let wordPool = JSON.parse(xhr.responseText);
                    dispatch(setWordPool(wordPool));
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
        let processId = setInterval(createWord.bind(this, params), 1000);
        return () => {
            clearInterval(processId);
        }
    }, [speed]);

    // Handle word timeout effect.
    const handleWordEscape = (id) => {
        dispatch(deleteWord(id));
        dispatch(adjustLife(-5));
    };

    // Create new word and add it to the store.
    let createWord = (params) => {
        let {words, wordPool, speed} = {...params.current};

        let indices = words.filter((word, index) => {
            if(word.value === "")
            {
                return true;
            }
        }).map((word, index) => {
            return index;
        });

        if(!indices.length)
        {
            return;
        }

        let rdIndex = indices[Math.floor(Math.random() * indices.length)];
        let newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        let timer = speed;

        dispatch(addWord(rdIndex, newWord, timer));
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