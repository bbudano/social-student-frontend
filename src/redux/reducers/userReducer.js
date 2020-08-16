import { SET_USER, LOADING_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    isLoading: false,
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            console.log(action)
            return {
                authenticated: true,
                isLoading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}