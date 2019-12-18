import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import useAnimator from 'Hooks/useAnimator';
import PropTypes from 'prop-types';

import './style.scss';

var Word = function(props)
{
    const [animator, nodeRef] = useAnimator();
    const PID = useRef(null);
    const chain = useSelector(state => state.chain);

    const animSpawn = {
        duration: 250,
        name: "word_spawn",
        easing: "linear"
    };

    const animNearEscape = {
        name: "word_near_escape",
        duration: 2250,
        easing: "ease-in"
    };

    const animValidated = {
        name: "word_validated",
        duration: 750,
        easing: "linear"
    };

    const animLiving = {
        name: "word_living",
        duration: props.timer - animSpawn.duration,
        easing: "linear",
        fillMode: "forwards"
    };

    useEffect(() => {
        if(props.word !== "")
        {
            animator.add(animSpawn);
            animator.refresh();

            const animLivingPID = setTimeout(() => {
                animator.add(animLiving);
                animator.refresh();
            }, animSpawn.duration);

            return () => {
                animator.clear();
                animator.refresh();
                clearTimeout(animLivingPID);
            }
        }
    }, [props.word]);

    useEffect(() => {
        if(props.word === "")
        {
            return;
        }

        if(!props.validated)
        {
            PID.current = setTimeout(() => {
                animator.add(animNearEscape);
                animator.refresh();

                PID.current = setTimeout(() => {
                    props.onWordEscape.call(this, props.id);

                }, animNearEscape.duration)

            }, props.timer - animNearEscape.duration);

            return () => {
                clearTimeout(PID.current);
                animator.refresh();
                animator.remove(animNearEscape);
            };
        }
        else
        {
            animator.add(animValidated);
            animator.remove(animNearEscape);
            animator.refresh();

            setTimeout(() => {
                props.onWordValidated.call(this, props.id, props.word.length, chain);
            }, animValidated.duration);
        }

    }, [props.validated, props.word]);

    return (
            <div className="word" ref={nodeRef}>
                {props.word}
            </div>
    ); 
};

Word.propTypes = {
    word : PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    onWordEscape: PropTypes.func.isRequired,
    onWordValidated: PropTypes.func.isRequired
};

export default Word;