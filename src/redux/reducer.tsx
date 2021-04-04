interface LoginData {
    email: string;
    password: string;
}

export interface UserData {
    id: string;
    email: string;
    profilePicture: string;
}

export type LoginAction =
    | { type: 'LOGIN_REQUEST'; input: LoginData }
    | { type: 'LOGIN_SUCCESS'; user: UserData }
    | { type: 'LOGIN_FAILED'; error: string };

interface LoginState {
    user: UserData;
    isLoading: boolean;
    error: string;
}


const initialState: LoginState = {
    user: null,
    error: null,
    isLoading: false
}

export const rootReducer = (state = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {...state, isLoading: true}
        case 'LOGIN_SUCCESS':
            return {...state, isLoading: false, user: action.user}
        case 'LOGIN_FAILED':
            return {...state, isLoading: false, error: action.error}
        default:
            return state;
    }
}
