import axios from 'axios';
import { APIURL } from './constants';
import {
    getFromSessionStorage,
    setToSessionStorage,
    removeSessionStorage,
    removeLocalStorage,
    setToLocalStorage
} from '../Utility/storage';

export const SET_THEME_PENDING = 'SET_THEME_PENDING';
export const SET_THEME_STATUS = 'SET_THEME_STATUS';
export const SET_THEME_ERROR = 'SET_THEME_ERROR';

const setThemePending = (isThemePending) => ({
  type: SET_THEME_PENDING,
  isThemePending,
});

const setThemeSuccess = (themeSuccess) => ({
  type: SET_THEME_STATUS,
  themeSuccess
})

const setThemeError = (themeError) => ({
  type: SET_THEME_ERROR,
  themeError
})

export const resetTheme = () => dispatch => {
  setToLocalStorage('currentTheme', 'default')
  dispatch(setThemePending(false));
  dispatch(setThemeSuccess('default'));
  dispatch(setThemeError(null));
}

export const getTheme = () => dispatch => {
  dispatch(setThemePending(true));
  dispatch(setThemeSuccess(false));
  dispatch(setThemeError(null));

  fetchTheme((data, error) => {
    dispatch(setThemePending(false));
    if (!error) {
      console.log('setThemeSuccess', true);
      dispatch(setThemeSuccess(data));
    } else {
      dispatch(setThemeError(error));
    }
  });
}

export const setTheme = (selectedTheme) => dispatch => {
  dispatch(setThemePending(true));
  dispatch(setThemeSuccess(false));
  dispatch(setThemeError(null));

  updateTheme( selectedTheme, error => {
    dispatch(setThemePending(false));
    if (!error) {
      console.log('setThemeSuccess', true);
      dispatch(setThemeSuccess(selectedTheme));
    } else {
      dispatch(setThemeError(error));
    }
  })
}

const fetchTheme = (callback) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getFromSessionStorage('token')
        }
    };

    axios.get(APIURL.PROFILE, options)
    .then((res) => {
        console.log("RESPONSE ==== : ", res);
        return res.data;
    })
    .then((res) => {
        console.log("Profile ==== : ", res.data.profile);
        if(res.data) {
            setToLocalStorage('currentTheme', res.data.profile.theme || 'default')
            return callback(res.data.profile.theme);
        } else {
            return callback(new Error('Invalid data'));
        }
    })
    .catch((err) => {
        console.log("ERROR: ====", err);
        return callback(new Error('Invalid data'));
    })
};


const updateTheme = (selectedTheme, callback) =>
  setTimeout(() => {
    setToLocalStorage('currentTheme', selectedTheme);

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getFromSessionStorage('token')
        }
    };
    
    const data = {
      selectedTheme: selectedTheme,
    };

    console.log('data', data);

    axios.post(APIURL.PROFILE, data, options)
    .then((res) => {
        console.log("RESPONSE ==== : ", res);
        return res.data;
    })
    .then((res) => {
        console.log("Profile ==== : ", res.data);
        if(res.data) {
            return callback(null);
        } else {
            return callback(new Error('Invalid data'));
        }
    })
    .catch((err) => {
        console.log("ERROR: ====", err);
        return callback(new Error('Invalid data'));
    })
  }, 500);