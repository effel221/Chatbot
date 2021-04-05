// actions

export function sendMessage(message:string){
    return {
        type: 'SEND_MESSAGE',
        message
    }
};

export function getMessage(message:string){
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
