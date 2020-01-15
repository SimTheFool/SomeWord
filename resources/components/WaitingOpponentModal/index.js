import React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from 'Actions';
import * as gameConst from 'Constants/GameConst';

import './style.scss';

import AppButton from 'Components/AppButton';

function WaitingOpponentModal(props)
{
    const dispatch = useDispatch();

    const handleClick = function() {
        dispatch(actions.setStatus(gameConst.NOT_PLAYING));
    };

    return (
        <div id="waiting-opponent-modal">
            <div>Waiting Opponent...
                <div>
                    <AppButton onClick={handleClick}>Cancel</AppButton>
                </div>
            </div>
        </div>
    );
}

export default WaitingOpponentModal;