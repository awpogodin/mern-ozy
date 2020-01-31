import React from 'react';
import { Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHttp } from '../../hooks/http.hook';
import { getUser } from '../../selectors/userSelectors';
import { login, logout } from '../../actions/userActions';

const styles = {
  formEl: {
    margin: '6px auto',
    width: '100%',
  },
};

const initValues = {
  email: '',
  password: '',
};

const validation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!values.password || !values.password.trim()) {
    errors.password = 'Required';
  }
  return errors;
};

const LoginForm = (props) => {
  const { request } = useHttp();

  const history = useHistory();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await request('/api/auth/signin', 'POST', values);
      props.login(data);
      // eslint-disable-next-line no-empty
    } catch (e) {}
    setSubmitting(false);
    history.goBack();
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
          <form>
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
              label="Password"
              name="password"
              variant="standard"
              style={styles.formEl}
            />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={styles.formEl}
            >
            Submit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

LoginForm.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    userId: PropTypes.string,
    email: PropTypes.string,
    fullname: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.number,
  }),
  login: PropTypes.func,
  logout: PropTypes.func,
};

LoginForm.defaultProps = {
  user: {},
  login: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = ({
  login,
  logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
