import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameConst from 'Constants/GameConst';
import * as actions from 'Actions';

import InputTextMobile from 'Components/InputTextMobile';
import InputTextDesktop from 'Components/InputTextDesktop';
import useRefCallback from 'Hooks/useRefCallback';

var InputText = function(props)
{
    const dispatch = useDispatch();
    const input = useSelector(state => state.input);
    const words = useSelector(state => state.words);
    const chain = useSelector(state => state.chain);
    const keyboard = useSelector(state => state.gameInfos.keyboard);
    const device = useSelector(state => state.gameInfos.device);

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
            dispatch(actions.incrementTypos());
            dispatch(actions.resetChain());
        }
    };

    const handleEnterKey = () => {
        checkWord(input);
        dispatch(actions.resetInput());
    };
    const handleEnterKeyRef = useRefCallback(handleEnterKey);

    const handleLetterKey = (keyName) => {
        dispatch(actions.setInput(input + keyName));
    };
    const handleLetterKeyRef = useRefCallback(handleLetterKey);

    const handleBackspaceKey = () => {
        dispatch(actions.setInput(input.slice(0, -1)));
    };
    const handleBackspaceKeyRef = useRefCallback(handleBackspaceKey);


    const inputComp = (device === gameConst.ON_MOBILE) ?
    <InputTextMobile handleEnterKey={handleEnterKeyRef}
        handleLetterKey={handleLetterKeyRef}
        handleBackspaceKey={handleBackspaceKeyRef}
        keyboard={keyboard}
    /> :
    <InputTextDesktop
        handleEnterKey={handleEnterKeyRef}
        handleLetterKey={handleLetterKeyRef}
        handleBackspaceKey={handleBackspaceKeyRef}
    />;

    return(
        <>
        {inputComp}
        </>
    );
}

export default InputText;