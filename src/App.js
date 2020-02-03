import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import ItemsScreen from './screens/ItemsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { logoutUser, setCurrentUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import NavBar from './components/Navbar';
import jwtStorage from './utils/jwtStorage';

import Config from './config/config';

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { setCurrentUser, logoutUser } = this.props;

    // Check for token to keep user logged in
    if (jwtStorage.getItem()) {
      // Set auth token header auth
      const token = jwtStorage.getItem();
      setAuthToken(token);
      // Decode token and get user info and exp
      try {
        const decoded = jwt.verify(token, Config.jwtSecret);
        // Set user and isAuthenticated
        setCurrentUser(decoded);
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
          // Logout user
          logoutUser();
        }
      } catch (e) {
        logoutUser();
        // throw new Error(e.message);
      }
    } else {
      logoutUser();
    }
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/">
            <ItemsScreen />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  setCurrentUser,
  logoutUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
