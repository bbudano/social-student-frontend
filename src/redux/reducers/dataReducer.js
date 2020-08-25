import { SET_POSTS, SET_POST, CREATE_POST, LIKE_POST, UNLIKE_POST, DELETE_POST, LOADING_DATA } from '../types';

const initialState = {
    posts: [],
    post: {},
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                isLoading: true
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false
            }
        case SET_POST:
            console.log(action.payload)
            return {
                ...state,
                post: action.payload
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let unlikeIndex = state.posts.findIndex((post) => post.id === action.payload.id);
            state.posts[unlikeIndex] = action.payload
            if(state.post.id === action.payload.id) {
                state.post = action.payload;
            }
            return {
                ...state
            }
        case DELETE_POST:
            let deleteIndex = state.posts.findIndex((post) => post.id === action.payload)
            state.posts.splice(deleteIndex, 1);
            return {
                ...state
            }
        default:
            return state;
    }
}