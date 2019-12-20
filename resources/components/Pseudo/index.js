import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import NeonText from 'Components/NeonText';
var Pseudo = function(props)
{

    let firstLetter = props.pseudo.slice(0, 1);

    return (
        <div className="pseudo">
            <span>
            <span className="first-letter">{firstLetter}</span>
            {props.pseudo.slice(1)}
            </span>
        </div>
    );
};

Pseudo.propTypes = {
    pseudo: PropTypes.string.isRequired
};

export default Pseudo;