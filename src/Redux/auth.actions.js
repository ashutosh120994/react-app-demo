import axios from 'axios';
import { APIURL } from './constants';
import {
    getFromSessionStorage,
    setToSessionStorage,
    removeSessionStorage,
    removeLocalStorage
} from '../Utility/storage';

export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

const setLoginPending = (isLoginPending) => ({
  type: SET_LOGIN_PENDING,
  isLoginPending,
});

const setLoginSuccess = (isLoggedIn) => ({
  type: SET_LOGIN_STATUS,
  isLoggedIn
})

const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError
})

export const login = (username, password) => dispatch => {
  dispatch(setLoginPending(true));
  dispatch(setLoginSuccess(false));
  dispatch(setLoginError(null));

  fetchLogin( username, password, error => {
    dispatch(setLoginPending(false));
    if (!error) {
      dispatch(setLoginSuccess(username));
    } else {
      dispatch(setLoginError(error));
    }
  })
}

export const logout = () => dispatch => {
    removeSessionStorage('token');
    dispatch(setLoginPending(false));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
}

const fetchLogin = (username, password, callback) => 
  setTimeout(() => {

    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    const data = {
        username: username,
        password: password
    };

    console.log('data', data);

    axios.post(APIURL.LOGIN, data, options)
    .then((res) => {
        console.log("RESPONSE ==== : ", res);
        return res.data;
    })
    .then((res) => {
        console.log("Token ==== : ", res.data.token);
        if(res.data && res.data.token) {
            setToSessionStorage('token', res.data.token);
            return callback(null);
        } else {
            return callback(new Error('Invalid username and password'));
        }
    })
    .catch((err) => {
        console.log("ERROR: ====", err);
        return callback(new Error('Invalid username and password'));
    })
  }, 1000);