import React from 'react';
import './style.scss';

import Flash from 'Components/Flash';
import WordGrid from 'Components/WordGrid';
import InputViewer from 'Components/InputViewer';

var Board = function(props)
{
    return (
        <div id="board">
            <div className="board-container">
                <WordGrid/>
                <InputViewer/>
            </div>
        </div>
    );
}

export default Board;