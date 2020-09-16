import { SET_USER, LOADING_USER, SET_ERRORS, SET_UNAUTHENTICATED, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/api/auth/login', userData)
        .then(response => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/api/auth/signup', newUserData)
        .then(response => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/login');
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/api/auth/userinfo')
        .then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data
            })
        })
        .catch(error => console.log(error))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios({
        method: 'PATCH',
        url: '/api/user',
        data: userDetails
    }).then(() => {
        dispatch(getUserData())
    }).catch(error => console.log(error));
}

const setAuthorizationHeader = (jwt) => {
    const token = `Bearer ${jwt}`
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
}