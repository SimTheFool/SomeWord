import * as types from './constants/actionTypes';
import * as serverConst from './constants/serverConst';

export const addClient = function()
{
    return {
        type:  types.ADD_CLIENT
    }
};

export const pairClient = function()
{
    return {
        type:  types.PAIR_CLIENT
    }
};

export const freeClient = function()
{
    return {
        type:  types.FREE_CLIENT
    }
};

export const setClientStatusPlaying = function()
{
    return {
        type:  types.SET_CLIENT_STATUS,
        status: serverConst.STATUS_PLAYING
    }
};

export const setClientStatusNotPlaying = function()
{
    return {
        type:  types.SET_CLIENT_STATUS,
        status: serverConst.STATUS_NOT_PLAYING
    }
};

export const setClientStatusWaiting = function()
{
    return {
        type:  types.SET_CLIENT_STATUS,
        status: serverConst.STATUS_WAITING
    }
};