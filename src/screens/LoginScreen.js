import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import Title from "../components/Title";

const styles = {
  container: {
    display: 'block',
    maxWidth: '600px',
    margin: '20px auto',
  },
};

const LoginScreen = () => (
  <div style={styles.container}>
    <Title title='Авторизация' />
    <LoginForm />
  </div>
);

export default LoginScreen;
