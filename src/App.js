import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemsScreen from './screens/ItemsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { loginUser, logoutUser } from './actions/authActions';
import NavBar from './components/Navbar';
import jwtStorage from './utils/jwtStorage';
import ShoppingCartScreen from './screens/ShoppingCartScreen';

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { loginUser, logoutUser } = this.props;

    // Check for token to keep user logged in
    if (jwtStorage.getItem()) {
      // Set auth token header auth
      const token = jwtStorage.getItem();
      loginUser(token);
    } else {
      logoutUser();
    }
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/category/phones" />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/category/phones">
            <ItemsScreen category="phones" />
          </Route>
          <Route path="/category/tablets">
            <ItemsScreen category="tablets" />
          </Route>
          <Route path="/category/accessories">
            <ItemsScreen category="accessories" />
          </Route>
          <Route path="/cart">
            <ShoppingCartScreen />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  loginUser,
  logoutUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
