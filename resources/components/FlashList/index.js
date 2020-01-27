import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from 'Actions';

import './style.scss';

import FlashMessage from 'Components/FlashMessage';

function FlashList(props)
{
    const flashMessages = useSelector(state => state.flashMessages);
    const dispatch = useDispatch();

    let content = flashMessages.map((flashMessage) => {

        let handleExpireFlashMessage = () => {
            dispatch(actions.removeFlashMessage(flashMessage.id));
        };

        return <FlashMessage msg={flashMessage.msg} duration={flashMessage.duration} key={flashMessage.id} onExpire={handleExpireFlashMessage}/>;
    })

    return (
        <div id="flashList">
            {content}
        </div>
    );
}

export default FlashList;