import React, {useEffect, useState, useRef} from 'react';
import useRefCallback from 'Hooks/useRefCallback';
import PropTypes from 'prop-types';

import './style.scss';

var Word = function(props)
{
    const [PID, setPID] = useState(null);
    const wordRef = useRef(null);

    const animeSpawn = () => {
        wordRef.current.style.animation = `0.75s word_spawn`;
    };
    const animeLiving = () => {
        wordRef.current.style.animation = `${props.timer/1000 - 0.75}s word_living`;
    };

    const animeNearEscape = () => {
        wordRef.current.style.animation += `, 3.5s word_near_escape`;
    };



    const startWordTimeline = () => {
        let pId;

            animeSpawn();

            pId = setTimeout(() => {

                animeLiving();

                pId = setTimeout(() => {

                    animeNearEscape()

                    pId = setTimeout(() => {

                        props.onWordEscape.call(this, props.id);
    
                    }, 3500);
                    setPID(pId);

                }, props.timer - 750 - 3500);
                setPID(pId);

            }, 750);
            setPID(pId);
    };

    const endWordTimeline = useRefCallback(() => {
        clearTimeout(PID);
        wordRef.current.style.animation =  "";
    });

    useEffect(() => {
        if(props.timer >= 0)
        {
            startWordTimeline();

            return () => {
                endWordTimeline();
            }
        }        
    }, [props.word]);

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
    onWordEscape: PropTypes.func.isRequired
};

export default Word;