import React from 'react';
import { useSetState } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/auth.actions';
import { Box, Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Row } from 'react-materialize';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px',
    margin: '40px 20px'
  },
  grid: {
    // padding: '10px',
    margin: '10px 0px'
  },
  submitButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    borderRadius: '2px',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '.75rem 1.25rem .75rem 1.25rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '110%',
    boxShadow:
        '0px 1px 3px rgba(124, 124, 123, 0.2), 0px 2px 1px -1px rgba(124, 124, 123, 0.12), 0px 1px 1px rgba(124, 124, 123, 0.14)',
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
}));

const initialState = {
  username: '',
  password: ''
}

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useSetState(initialState);
  const {
    isLoginPending,
    isLoggedIn,
    loginError
  } = useSelector(state => ({
    isLoginPending: state.auth.isLoginPending,
    isLoggedIn: state.auth.isLoggedIn,
    loginError: state.auth.loginError,
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    dispatch(login(username, password));
    setState({
      username: '',
      password: ''
    });
  }
    
  return (
    <Container component="main" maxWidth="xs">
      <Row>
        <Box>
          <Paper className={classes.paper}>
            <Grid
              container
            >
              <Grid item xs={12}>
                <Typography variant="h4">
                  Login
                </Typography>
              </Grid>
              <form name="loginForm" onSubmit={onSubmit}>
                <Grid item xs={12} className={classes.grid}>
                  <TextField 
                    label="Username"
                    type="text" 
                    name="username"
                    fontSize='12px' 
                    onChange={e => setState({username: e.target.value})} 
                    value={state.username} 
                    placeholder="username" 
                  />
                </Grid>
                <Grid item xs={12} className={classes.grid}>
                  <TextField 
                    label="Password"
                    type="password" 
                    name="password" 
                    onChange={e => setState({password: e.target.value})}
                    value={state.password} 
                    placeholder="password" 
                  />
                </Grid>
                
                <Grid item xs={12} className={classes.grid}>
                  <Button className={classes.submitButton} onClick={onSubmit}> Login </Button>
                </Grid>
              </form>
              <Grid item xs={12} className={classes.grid}>
                { isLoginPending && <div>Please wait...</div> }
                { isLoggedIn && <div>Success.</div> }
                { loginError && <div>{loginError.message}</div> }
              </Grid>
            </Grid>
          </Paper> 
          
        </Box>
      </Row>
    </Container>
  )
}


export default LoginForm;