export interface MessageData {
    text: string;
    data: any;
    isBot?: boolean;
}

export type WsChatAction =
    | { type: 'SEND_MESSAGE'; message: MessageData }
    | { type: 'GET_MESSAGE'; message: MessageData }
    | { type: 'WS_FAILED'; error: boolean };

export interface WsChatState {
    messagesArr: MessageData[];
    error: boolean;
}
