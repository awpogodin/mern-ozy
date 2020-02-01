import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Title from '../components/Title';
import RegisterForm from '../components/forms/RegisterForm';

const RegisterScreen = (props) => {
  const { auth } = props;

  if (auth.isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }
  return (
    <>
      <Title title="Регистрация" />
      <RegisterForm />
    </>
  );
};

RegisterScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.any.isRequired,
};


const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(mapStateToProps, {})(RegisterScreen);
