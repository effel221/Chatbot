// actions
import {MessageData} from '../Components/Interfaces';

export function sendMessage(message:MessageData){
    return {
        type: 'SEND_MESSAGE',
        message
    }
};

export function getMessage(message:MessageData){
    return {
        type: 'GET_MESSAGE',
        message
    }
};

export function setError(hasError:boolean){
    return {
        type: 'WS_FAILED',
        hasError
    }
};
