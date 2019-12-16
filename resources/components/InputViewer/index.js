import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Word from 'Components/Word';

var InputViewer = function(props)
{
    return (
        <div className="input-viewer">
            <span className="input-viewer-left">></span>
            <span className="input-viewer-content">{props.input}</span>
            <span className="input-viewer-right">|</span>
        </div>
    );
};

InputViewer.propTypes = {
    input: PropTypes.string.isRequired
};

export default InputViewer;