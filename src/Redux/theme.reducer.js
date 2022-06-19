import {
    SET_THEME_PENDING , 
    SET_THEME_STATUS , 
    SET_THEME_ERROR 
  } from './theme.actions'
  
  export default function ThemeReducer (state = {
    themeSuccess: false,
    isThemePending: false,
    themeError: null
  }, action) {
    switch (action.type) {
      case SET_THEME_PENDING:
        return Object.assign({}, state, {
          isThemePending: action.isThemePending
        });
  
      case SET_THEME_STATUS:
        return Object.assign({}, state, {
          themeSuccess: action.themeSuccess
        });
  
      case SET_THEME_ERROR:
        return Object.assign({}, state, {
          themeError: action.themeError
        });
  
      default:
        return state;
    }
  } 