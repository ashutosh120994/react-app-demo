import './App.css';
import React, { Component, Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  createTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import { purple, green, orange } from "@material-ui/core/colors";
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from './Redux/theme.actions';

import { getFromLocalStorage, setToLocalStorage } from './Utility/storage';
import themes from './themes';

import Login from './Login';
import Dashboard from './Dashboard'
import { Header, Footer } from "./Layout";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const themeSuccess = useSelector(state => state.theme.themeSuccess);
  console.log('choosen theme', themeSuccess);
  const createThemeObject = (theme) => {

    const themeObject = createTheme({
      palette: {
        primary: themes[theme].primary,
        secondary: themes[theme].secondary,
      },
      spacing: 8
    });

    return themeObject;
  }

  const [selectedTheme, setSelectedTheme] = useState(createThemeObject('default'));

  useEffect(() => {
    const currentTheme = getFromLocalStorage("currentTheme");
    if (currentTheme) {
      setSelectedTheme(createThemeObject(currentTheme));
    } else {

    }
  }, []);

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getTheme());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const currentTheme = getFromLocalStorage("currentTheme");
    if (currentTheme && themeSuccess) {
      setSelectedTheme(createThemeObject(currentTheme));
    }
  }, [themeSuccess]);

  let innerContent;
  if (!isLoggedIn) {
    innerContent = <Login />;
  } else {
    innerContent = <Dashboard />;
  }

  return (
    <ThemeProvider theme={selectedTheme}>
        <Header />
        { innerContent }
        <Footer />
    </ThemeProvider>
  )
  
}

export default App;
