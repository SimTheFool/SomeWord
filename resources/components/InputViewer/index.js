import React from 'react';
import './style.scss';

import Word from 'Components/Word';

var InputViewer = function(props)
{
    return (
        <div className="input-viewer">
            >
            <Word/>
            |
        </div>
    );
}

export default InputViewer;