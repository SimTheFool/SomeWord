import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

var Word = function(props)
{
    useEffect(() => {
        if(props.timer >= 0)
        {
            let processId = setTimeout( props.onWordEscape.bind(this, props.id), props.timer);
            return () => {
                clearTimeout(processId);
            };
        }        
    }, [props.word]);

    return (
        <div className="word">
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