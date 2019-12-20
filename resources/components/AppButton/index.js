import React from 'react';

import './style.scss';

var AppButton = function(props) {

    return (
        <button className="app-button" onClick={props.onClick}> {props.children} </button>
    );

};

export default AppButton;