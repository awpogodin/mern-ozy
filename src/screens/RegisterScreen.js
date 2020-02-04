import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Title from '../components/Title';
import RegisterForm from '../components/forms/RegisterForm';
import { authProps } from '../propTypes/proptypes';

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
  auth: authProps.isRequired,
};


const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(mapStateToProps, {})(RegisterScreen);
