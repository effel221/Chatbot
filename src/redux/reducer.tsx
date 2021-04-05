// reducer

import {WsChatAction, WsChatState} from '../Components/Interfaces';


const initialState: WsChatState = {
    messagesArr: [],
    error: false
}

export const rootReducer = (state = initialState, action: WsChatAction): WsChatState => {
    const messageItems = [];
    switch (action.type) {
        case 'SEND_MESSAGE':
            messageItems.push({text: action.message.text, data: action.message.data });
            return {...state, messagesArr: messageItems}
        case 'GET_MESSAGE':
            messageItems.push({text: action.message.text, data: action.message.data, isBot: true });
            return {...state, messagesArr: messageItems}
        case 'WS_FAILED':
            return {...state, error: true}
        default:
            return state;
    }
}
