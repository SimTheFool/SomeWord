import React, {useEffect} from 'react';
import useTweenedProp from 'Hooks/useTweenedProp';
import useAnimator from 'Hooks/useAnimator';
import PropTypes from 'prop-types';

import './style.scss';

var test = {
    a: 0
};

var Score = function(props)
{

    const [animator, nodeRef] = useAnimator();

    const tweeningDuration = 2250;

    const tweenedScore = useTweenedProp(props.score, {
        duration: (props.score === 0) ? 0 : tweeningDuration,
        autoplay: false,
        easing: "easeInCirc",
        begin: () => {
            
            if(animator.isOver(animScoreStopIncrementing))
            {
                console.log('dqsdd')
                animator.add(animScoreIncrementing);
                animator.refresh(true);
            }
            else
            {
                animator.add(animScoreIncrementing);
                animator.refresh(false);
            }
        },
        complete: () => {
            animator.add(animScoreStopIncrementing);
            animator.refresh(true);
        }
    });

    const animScoreIncrementing = {
        duration: tweeningDuration / 2,
        name: "score_increment",
        easing: "linear",
        fill: "forwards"
    };

    const animScoreStopIncrementing = {...animScoreIncrementing, direction: "reverse"};



    return (
        <div className="score">
            SCORE <span ref={nodeRef}>{Math.floor(tweenedScore)}</span>
        </div>
    );
};

Score.propTypes = {
    score: PropTypes.number.isRequired
};

export default Score;