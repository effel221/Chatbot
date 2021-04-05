// reducer

import {WsChatAction, WsChatState, MessageData} from '../Components/Interfaces';


const initialState: WsChatState = {
    messagesArr: [],
    error: false
}

export const rootReducer = (state = initialState, action: WsChatAction): WsChatState => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            const messageItemsSend = {text: action.message.text, data: action.message.data };
            return {...state, messagesArr: [...state.messagesArr, messageItemsSend]};
        case 'GET_MESSAGE':
            const messageItemsGet = {text: action.message.text, data: action.message.data, isBot: true };
            return {...state, messagesArr: [...state.messagesArr, messageItemsGet]}
        case 'WS_FAILED':
            return {...state, error: true}
        default:
            return state;
    }
}
