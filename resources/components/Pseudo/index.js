import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { stringify } from 'querystring';

var Pseudo = function(props)
{
    return (
        <div className="pseudo">
            {props.pseudo}
        </div>
    );
};

Pseudo.propTypes = {
    pseudo: PropTypes.string.isRequired
};

export default Pseudo;