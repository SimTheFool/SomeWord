import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useAnimator from 'Hooks/useAnimator';

import './style.scss';

function FlashMessage(props)
{
    const [animator, nodeRef] = useAnimator();

    const animDuration = 1500;

    const animSpawn = {
        duration: animDuration,
        name: "flash_spawn",
        easing: "ease-in"
    };

    const animUnspawn = {...animSpawn, direction: 'reverse'};

    useEffect(() => {

        animator.add(animSpawn);
        animator.refresh(true);

        if(props.duration < 0)
        {
            return;
        }

        setTimeout(() => {

            animator.clear();
            animator.add(animUnspawn);
            animator.refresh(true);

            setTimeout(() => {
                props.onExpire();
            }, animDuration);

        }, props.duration - animDuration);

    }, []);

    return (
        <div className="flashMessage" ref={nodeRef}>
            {props.msg}
        </div>
    );
}

FlashMessage.propTypes = {
    msg: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    onExpire: PropTypes.func.isRequired
};

export default FlashMessage;