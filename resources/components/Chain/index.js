import React, { useEffect } from 'react';
import useAnimator from 'Hooks/useAnimator';
import PropTypes from 'prop-types';

import './style.scss';

var Chain = function(props)
{
    const [animator, nodeRef] = useAnimator();

    const animChainIncrement = {
        duration: 750,
        name: "chain_increment",
        easing: "linear",
        direction: "alternate"
    };

    useEffect(() => {
        if(props.chain === 0)
        {
            return;
        }

        animator.add(animChainIncrement);
        animator.refresh(true);

    }, [props.chain])

    return (
        <div className="chain">
            <span className="first-letter">C</span>HAIN <span className="value" ref={nodeRef}>{props.chain}</span>
        </div>
    );
};

Chain.propTypes = {
    chain: PropTypes.number.isRequired
};

export default Chain;