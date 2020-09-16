import { 
    SET_POSTS,
    LOADING_DATA,
    LOADING_UI,
    STOP_LOADING_UI,
    CREATE_POST,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_POST,
    SUBMIT_COMMENT } from '../types';
import axios from 'axios';

export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/api/post', newPost)
    .then(response => {
        dispatch({
            type: CREATE_POST,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        });
    })
}

export const getPosts = (page, size) => (dispatch) => {
    if(page === 0) dispatch({ type: LOADING_DATA });
    axios.get(`/api/post?page=${page}&size=${size}`)
        .then(response => {
            dispatch({
                type: SET_POSTS,
                payload: response.data.content
            })
        })
        .catch(error => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/api/post/${postId}`)
    .then(response => {
        dispatch({
            type: SET_POST,
            payload: response.data
        })
        dispatch({ type: STOP_LOADING_UI });
    })
    .catch(error => console.log(error));
}

export const likePost = (postId) => (dispatch) => {
    axios.get(`/api/post/${postId}/like`)
    .then(response => {
        dispatch({
            type: LIKE_POST,
            payload: response.data
        })
    })
    .catch(error => console.log(error));
}

export const unlikePost = (postId) => (dispatch) => {
    axios.get(`/api/post/${postId}/unlike`)
    .then(response => {
        dispatch({
            type: UNLIKE_POST,
            payload: response.data
        })
    })
    .catch(error => console.log(error));
}

export const submitComment = (postId, commentData) => (dispatch) => {
    axios.post(`/api/post/${postId}/comment`, commentData)
    .then(response => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: response.data
        })
        dispatch(clearErrors());
    })
    .catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        })
    })
}

export const deletePost = (postId) => (dispatch) => {
    axios.delete(`api/post/${postId}`)
    .then(() => {
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
    })
    .catch(error => console.log(error));
}

export const getUser = (username) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/api/user/${username}`)
    .then(response => {
        dispatch({
            type: SET_POSTS,
            payload: response.data.posts
        });
    })
    .catch(() => {
        dispatch({
            type: SET_POSTS,
            payload: null
        });
    });
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}