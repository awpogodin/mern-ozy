import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

const styles = {
  form: {
    maxWidth: '500px',
    margin: '15px auto',
  },
  formEl: {
    margin: '10px auto',
    width: '100%',
  },
  loginLink: {
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
  name: '',
  surname: '',
  middleName: '',
  address: '',
  phone: '',
  password: '',
  password2: '',
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
  if (!values.name || !values.name.trim()) {
    errors.name = 'Введите имя';
  }
  if (values.name.length < 3) {
    errors.name = 'Имя должно содержать более 3 букв';
  }
  if (!values.surname || !values.surname.trim()) {
    errors.surname = 'Введите фамилию';
  }
  if (values.surname.length < 3) {
    errors.surname = 'Фамилия должна содержать более 3 букв';
  }
  if (!values.middleName || !values.middleName.trim()) {
    errors.middleName = 'Введите отчество';
  }
  if (values.middleName.length < 3) {
    errors.middleName = 'Отчество должно содержать более 3 букв';
  }
  if (!values.address || !values.address.trim()) {
    errors.address = 'Введите адрес';
  }
  if (values.address.length < 3) {
    errors.address = 'Адрес должен содержать более 3 символов';
  }
  if (!values.phone || !values.phone.trim()) {
    errors.phone = 'Введите телефон';
  }
  if (values.phone.length < 9) {
    errors.phone = 'Номер должен содержать более 3 цифр';
  }
  if (values.phone.length > 11) {
    errors.phone = 'Номер не должен содержать более 11 цифр';
  }
  if (!/^\d+$/.test(values.phone)) {
    errors.phone = 'Номер должен содержать только цифры';
  }
  if (!values.password || !values.password.trim()) {
    errors.password = 'Введите пароль';
  }
  if (values.password !== values.password2) {
    errors.password2 = 'Пароли не совпадают';
  }
  return errors;
};

const RegisterForm = () => {
  const history = useHistory();

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log(values);
    axios
      .post('/api/auth/register', values)
      .then(() => {
        setSubmitting(false);

        history.push('/login');
      })
      .catch(err => {
        setErrors(err.response.data);
        setSubmitting(false);
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
              name="name"
              type="input"
              label="Имя"
              variant="standard"
              style={styles.formEl}
              onChange={handleChange}
            />
            <br />
            <TextField
              name="surname"
              type="input"
              label="Фамилия"
              variant="standard"
              style={styles.formEl}
              onChange={handleChange}
            />
            <br />
            <TextField
              name="middleName"
              type="input"
              label="Отчество"
              variant="standard"
              style={styles.formEl}
              onChange={handleChange}
            />
            <br />
            <TextField
              name="address"
              type="input"
              label="Адрес доставки"
              variant="standard"
              style={styles.formEl}
              onChange={handleChange}
            />
            <br />
            <TextField
              name="phone"
              type="tel"
              label="Телефон"
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
            <br />
            <TextField
              type="password"
              label="Пароль"
              name="password2"
              variant="standard"
              style={styles.formEl}
            />
            <br />
            {isSubmitting && <LinearProgress />}
            <br />
            <Link style={styles.loginLink} to="/login">Уже зарегистрированы? Войти</Link>
            <Button
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={styles.formEl}
            >
              Зарегистрироваться
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
