import uniqid from 'uniqid';

//Flash Message Speed
const FLASH_SPEED_MEDIUM = 10000;
const FLASH_SPEED_INFINITE = -1;

//Flash Messages
export const OPONNENT_DISCONNECTED = {
    id: uniqid(),
    msg: "Your oponnent has gone !",
    duration: FLASH_SPEED_INFINITE
};

export const WAITING_OPONNENT = {
    id: uniqid(),
    msg: "Waiting Oponnent",
    duration: FLASH_SPEED_INFINITE
};