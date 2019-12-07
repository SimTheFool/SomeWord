import React, {useEffect, useRef} from 'react';
import useRefCallback from 'Hooks/useRefCallback';
import * as actions from 'Actions';
import {useSelector, useDispatch} from 'react-redux';

import './style.scss';

var InputTextDesktop = function(props)
{
    const input = useSelector(state => state.input);
    const words = useSelector(state => state.words);
    const dispatch = useDispatch();

    const handleKeyPress = (e) => {
        let key = Math.max(e.charCode, e.keyCode);
            
        if(key === 13)
        {
            checkWord(input);
            dispatch(actions.resetInput());
        }
        else
        {
            dispatch(actions.setInput(input + e.key.toUpperCase()));
        }
    };
    const handleKeyPressRef = useRefCallback(handleKeyPress);

    const handleKeyDown = (e) => {
        if(e.keyCode === 8)
        {
            dispatch(actions.setInput(input.slice(0, -1)));
        }
    };
    const handleKeyDownRef = useRefCallback(handleKeyDown);

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPressRef);
        document.addEventListener('keydown', handleKeyDownRef);
    }, []);

    const checkWord = (value) => {
        if(value === "")
        {
            return;
        }

        let index = words.findIndex((word) => {
            return word.value === value;
        })
        
        if(index !== -1)
        {
            dispatch(actions.deleteWord(index));
            let scoreGain = Math.floor(value.length * 10 * Math.pow(chain + 1, 1.3));
            dispatch(actions.incrementScore(scoreGain));
            dispatch(actions.incrementChain());
        }
        else
        {
            dispatch(actions.resetChain());
        }
    };

    return (
        <>
        </>
    );
}

export default InputTextDesktop;