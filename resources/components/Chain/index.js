import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

var Chain = function(props)
{
    return (
        <div className="chain">
            CHAIN {props.chain}
        </div>
    );
};

Chain.propTypes = {
    chain: PropTypes.number.isRequired
};

export default Chain;