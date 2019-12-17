import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import useRefCallback from 'Hooks/useRefCallback';
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
        duration: props.timer - animSpawn.duration - animNearEscape.duration,
        easing: "linear",
        fillMode: "forwards"
    };

    useEffect(() => {
        if(props.word !== "")
        {
            animator.add(animSpawn);

            const animLivingPID = setTimeout(() => {
                animator.add(animLiving);
            }, animSpawn.duration);

            return () => {
                animator.clear();
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

                PID.current = setTimeout(() => {
                    props.onWordEscape.call(this, props.id);

                }, animNearEscape.duration)

            }, props.timer - animNearEscape.duration);

            return () => {
                clearTimeout(PID.current);
                animator.remove(animNearEscape.name);
            };
        }
        else
        {
            animator.add(animValidated);
            animator.remove(animNearEscape);

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