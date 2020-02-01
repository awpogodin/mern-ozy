import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Title from '../components/Title';
import LoginForm from '../components/forms/LoginForm';

const LoginScreen = (props) => {
  const { auth } = props;

  if (auth.isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }
  return (
    <>
      <Title title="Авторизация" />
      <LoginForm />
    </>
  );
};

LoginScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LoginScreen);
