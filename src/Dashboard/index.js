import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Row } from 'react-materialize';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../Redux/auth.actions'

const Dashboard = () => {
  const {
    isLoggedIn,
  } = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
  }));
  const {
    isThemePending,
    themeSuccess,
    themeError
  } = useSelector(state => ({
    isThemePending: state.theme.isThemePending,
    themeSuccess: state.theme.themeSuccess,
    themeError: state.theme.themeError,
  }));

  return (
    <Container style={{ margin: '40px' }}>
      <Row>
          <Grid>
            <Typography variant="h5">
              Hello {isLoggedIn || 'User'}!
            </Typography>
            <Typography variant="h5" style={{ margin: '25px 0px' }}>
                { isThemePending && <div>Changing theme...</div> }
                { themeSuccess && <div>Theme set to : <i>{ themeSuccess }</i></div> }
                { themeError && <div>{themeError.message}</div> }
              </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
          </Grid>
      </Row>
    </Container>
  );
}

export default Dashboard;