import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Word from 'Components/Word'

var WordGrid = function(props)
{
    let wordsComps = props.words.map((word, index) => {
        return (
            <Word word={word.value}
            timer={word.timer}
            id={index}
            onWordEscape={props.onWordEscape}
            key={index}
            />
        );
    });

    return (
        <div className="word-grid">
            {wordsComps}
        </div>
    );
};

WordGrid.propTypes = {
    words: PropTypes.array.isRequired,
    onWordEscape: PropTypes.func.isRequired
};

export default WordGrid;