import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import { loginUser } from '../../actions/authActions';
import { authProps } from '../../propTypes/proptypes';

const styles = {
  form: {
    maxWidth: '500px',
    margin: '15px auto',
  },
  formEl: {
    margin: '10px auto',
    width: '100%',
  },
  regLink: {
    display: 'block',
    margin: '10px 0',
    textAlign: 'right',
    textDecoration: 'none',
    color: '#03A9F4',
    fontWeight: '300',
    fontSize: '16px',
  },
};

const initValues = {
  email: '',
  password: '',
};

const validation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Введите email';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Некорректный email';
  }
  if (!values.password || !values.password.trim()) {
    errors.password = 'Введите пароль';
  }
  return errors;
};

const LoginForm = (props) => {
  const [readyToBack, setReadyToBack] = React.useState(false);
  const history = useHistory();
  const { auth } = props;

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (readyToBack && auth.isAuthenticated) {
      history.goBack();
    }
  }, [auth]);

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    await axios
      .post('/api/auth/login', values)
      .then(async res => {
        const { token } = res.data;
        props.loginUser(token);
        setReadyToBack(true);
        setSubmitting(false);
      })
      .catch(err => {
        setErrors(err.response.data);
      });
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        validate={validation}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form style={styles.form}>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="standard"
              style={styles.formEl}
              onChange={handleChange}
            />
            <br />
            <TextField
              type="password"
              label="Пароль"
              name="password"
              variant="standard"
              style={styles.formEl}
            />
            {isSubmitting && <LinearProgress />}
            <br />
            <Link style={styles.regLink} to="/register">Нет аккаунта? Зарегистрироваться</Link>
            <Button
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={styles.formEl}
            >
              Войти
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: authProps.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  loginUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
