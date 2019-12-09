import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

var InputTextDesktop = function(props)
{
    const handleKeyPress = (e) => {
        let key = Math.max(e.charCode, e.keyCode);
            
        if(key === 13)
        {
            props.handleEnterKey();
        }
        else
        {
            props.handleLetterKey(e.key.toUpperCase());
        }
    };

    const handleKeyDown = (e) => {
        if(e.keyCode === 8)
        {
            props.handleBackspaceKey();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
        </>
    );
};

InputTextDesktop.propTypes = {
    handleLetterKey: PropTypes.func.isRequired,
    handleBackspaceKey: PropTypes.func.isRequired,
    handleEnterKey: PropTypes.func.isRequired
};

export default InputTextDesktop;