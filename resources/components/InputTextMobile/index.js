import React from 'react';
import * as actions from 'Actions';
import {useSelector, useDispatch} from 'react-redux';

import './style.scss';

import Key from 'Components/Key';

var InputTextMobile = function(props)
{

    const dispatch = useDispatch();
    const input = useSelector(state => state.input);
    const words = useSelector(state => state.words);
    const chain = useSelector(state => state.chain);
    let keyboard = useSelector(state => state.gameInfos.keyboard);

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

    const handleTouch = (keyName) => {
        switch(keyName)
        {
            case "ENTER":
                checkWord(input);
                dispatch(actions.resetInput());
                break;

            case "BACK":
                dispatch(actions.setInput(input.slice(0, -1)));
                break;

            default:
                dispatch(actions.setInput(input + keyName));
        }
    };

    keyboard = keyboard.map((row, index) => {

        let keys = row.map((keyName, index) => {
            return <Key keyName={keyName} onTouch={handleTouch} key={index}/>
        })

        return (
            <div className="keyboard-line" key={index}>
                {keys}
            </div>
        )
    })

    return (
        <div id="input-text-mobile">
            <div id="keyboard">
                {keyboard}
            </div>
        </div>
    );
}

export default InputTextMobile;