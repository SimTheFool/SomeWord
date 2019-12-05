import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Word from 'Components/Word';

var InputViewer = function(props)
{
    return (
        <div className="input-viewer">
            >
            <span>{props.input}</span>
            |
        </div>
    );
};

InputViewer.propTypes = {
    input: PropTypes.string.isRequired
};

export default InputViewer;