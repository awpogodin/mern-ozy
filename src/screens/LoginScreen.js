import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Title from '../components/Title';
import LoginForm from '../components/forms/LoginForm';
import { authProps } from '../propTypes/proptypes';

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
  auth: authProps.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LoginScreen);
