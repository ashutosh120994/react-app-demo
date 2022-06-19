import React, { useEffect }from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Link,
  Button,
  useTheme
} from "@material-ui/core";

// import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { logout } from '../Redux/auth.actions'
import { resetTheme } from '../Redux/theme.actions'

import { setToLocalStorage, getFromLocalStorage } from "../Utility/storage";
import { setTheme } from '../Redux/theme.actions';

const useStyles = makeStyles((theme) => ({
    navlinks: {
        // marginLeft: theme.spacing(10),
        // display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
        color: theme.palette.secondary.main,
    },
    link: {
        textDecoration: "",
        color: theme.palette.secondary.main,
        fontSize: theme.typography.fontSize,
        padding: "2px",
        margin: theme.spacing(5),
        // "&:hover": {
        //     color: "#FFF",
        //     border: "1px solid #FFF",
        // },
    },
}));

const Navbar = () => {
  const classes = useStyles();
  console.log(classes);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
    console.log('state', state)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [val, setVal] = React.useState('default');

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetTheme());
  }

  useEffect(() => {
    const currentTheme = getFromLocalStorage("currentTheme");
    if (currentTheme) {
        setVal(currentTheme);
    }
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setToLocalStorage('currentTheme', event.target.value)
    setVal(event.target.value);
    dispatch(setTheme(event.target.value));
  };

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          Demo React Application
        </Typography>
        {isLoggedIn && (
            <>
                <Link to="/about" className={classes.link}>
                    About
                </Link>
                <Dropdown
                    value={val}
                    handleChange={handleChange}
                    items={[
                    { key: "Default", value: 'default', name: 'Default'},
                    { key: "Summer Splash", value: 'summerSplash', name: 'Summer Splash' },
                    { key: "Rosy Flamingo", value: 'rosyFlamingo', name: 'Rosy Flamingo' },
                    { key: "Window Tide", value: 'windowTide', name: 'Window Tide' }
                    ]}
                />
                <Link className={classes.link} onClick={onLogout} >
                    Logout
                </Link>
            </>
        )}
        {!isLoggedIn && (
            <Link to="/login" className={classes.link}>
                Login
            </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;