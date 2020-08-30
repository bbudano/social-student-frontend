import { SET_POSTS, SET_POST, CREATE_POST, LIKE_POST, UNLIKE_POST, DELETE_POST, LOADING_DATA, SUBMIT_COMMENT } from '../types';

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
        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments]
                }
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(
                (post) => post.id === action.payload.id
              );
              state.posts[index] = action.payload;

              if (state.post.id === action.payload.id) {
                let post = { ...state.post };
                post.likeCount = action.payload.likeCount;
                state.post = post;
              }

              return {
                ...state
              };
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