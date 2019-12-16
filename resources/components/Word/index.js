import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import useRefCallback from 'Hooks/useRefCallback';
import PropTypes from 'prop-types';

import './style.scss';

import Animator from 'Utils/Animator';

var Word = function(props)
{
    const anim = useRef(new Animator());
    const wordRef = useRef(null);
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
        anim.current.setNode(wordRef.current);
    }, []);


    useEffect(() => {
        if(props.word !== "")
        {
            anim.current.add(animSpawn);

            const animLivingPID = setTimeout(() => {
                anim.current.add(animLiving);
            }, animSpawn.duration);

            return () => {
                anim.current.clear();
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
                anim.current.add(animNearEscape);

                PID.current = setTimeout(() => {
                    props.onWordEscape.call(this, props.id);

                }, animNearEscape.duration)

            }, props.timer - animNearEscape.duration);

            return () => {
                clearTimeout(PID.current);
                anim.current.remove(animNearEscape.name);
            };
        }
        else
        {
            anim.current.add(animValidated);
            anim.current.remove(animNearEscape);

            setTimeout(() => {
                props.onWordValidated.call(this, props.id, props.word.length, chain);
            }, animValidated.duration);
        }

    }, [props.validated, props.word]);

    return (
            <div className="word" ref={wordRef}>
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