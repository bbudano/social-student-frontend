import {
    SET_USER,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LIKE_POST,
    UNLIKE_POST
} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    roles: [],
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
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        postId: action.payload.id
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.payload.id)
            }
        default:
            return state;
    }
}