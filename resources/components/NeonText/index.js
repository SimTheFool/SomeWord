import React from 'react';

import './style.scss';

var NeonText = function(props)
{
    return(
        <span className="neon-text">
            {props.children}
        </span>
    );
};

export default NeonText;