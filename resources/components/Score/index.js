import React, {useEffect} from 'react';
import useTweenedProp from 'Hooks/useTweenedProp';
import useAnimator from 'Hooks/useAnimator';
import PropTypes from 'prop-types';

import './style.scss';

var Score = function(props)
{

    const [animator, nodeRef] = useAnimator();

    const tweeningDuration = 2000;

    const tweenedScore = useTweenedProp(props.score, {
        duration: tweeningDuration,
        autoplay: false,
        easing: "easeInCirc",
        begin: () => {

            if(animator.hasTag("incrementing"))
            {
                return;
            }

            animator.add(animScoreIncrementing);
            animator.refresh(true);
        },
        complete: () => {
            animator.add(animScoreStopIncrementing);
            animator.refresh(true);
        }
    });

    const animScoreIncrementing = {
        tag: "incrementing",
        duration: tweeningDuration / 3,
        name: "score_incrementing",
        easing: "linear",
        fill: "forwards"
    };

    const animScoreStopIncrementing = {...animScoreIncrementing, direction: "reverse", tag: "stopIncrementing", duration: tweeningDuration / 5};

    return (
        <div className="score">
            <span className="first-letter">S</span>CORE <span className="value" ref={nodeRef}>{Math.floor(tweenedScore)}</span>
        </div>
    );
};

Score.propTypes = {
    score: PropTypes.number.isRequired
};

export default React.memo(Score, (prev, next) => {
    return prev.score === next.score;
});