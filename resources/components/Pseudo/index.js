import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import NeonText from 'Components/NeonText';
var Pseudo = function(props)
{
    let firstLetter = props.pseudo.slice(0, 1);

    return (
        <div className="pseudo">
            <span className="pseudo-box">
                <span className="first-letter">{firstLetter}</span>
                {props.pseudo.slice(1)}
            </span>
        </div>
    );
};

Pseudo.propTypes = {
    pseudo: PropTypes.string.isRequired
};

export default React.memo(Pseudo, (prev, next) => {
    if(prev.pseudo !== next.pseudo)
    {
        return false;
    }
    return true;
});