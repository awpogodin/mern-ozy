/* eslint-disable no-shadow */
import React from 'react';
import './creditCard.css';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moonAlgorithm from '../../utils/moonAlgorithm';
import { clearShoppingCart } from '../../actions/shoppingCartActions';
import { shoppingCartProps } from '../../propTypes/proptypes';


const styles = {
  creditCard: {
    display: 'block',
    margin: '100px auto',
    padding: '15px',
    borderRadius: '15px',
    width: '500px',
    minHeight: '300px',
    boxShadow: '5px 5px 30px 0 rgba(33,33,33,0.1)',
  },
  cardRow: {
    margin: '20px auto',
    width: '400px',
    textAlign: 'center',
  },
  cardNumberInput: {
    width: '100%',
    fontSize: '41px',
    textAlign: 'center',
  },
  cardHolderInput: {
    width: '100%',
    fontSize: '41px',
    textAlign: 'center',
  },
  cardDateCVC: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 auto',
    marginTop: '50px',
    width: '400px',
    fontSize: '30px',
  },
};

const CreditCardForm = (props) => {
  const { shoppingCart, clearShoppingCart } = props;
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        number: '',
        month: '',
        year: '',
        cvc: '',
        holder: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.number.trim()) {
          errors.number = 'Введите номер карты';
        }
        if (values.number.length !== 16) {
          errors.number = 'Длина карты должна быть 16 цифр';
        } else if (!moonAlgorithm(values.number)) {
          errors.number = 'Некорректный номер карты';
        }
        if (!values.month.trim()) {
          errors.month = 'Введите месяц';
        }
        if (!values.year.trim()) {
          errors.year = 'Введите год';
        }
        if (!values.holder.trim()) {
          errors.holder = 'Введите держателя карты';
        } else if (values.holder.length < 3) {
          errors.holder = 'Длина поля от 3 символов';
        }
        if (values.cvc.length !== 3) {
          errors.cvc = 'Некорректный CVC код';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await axios
          .post('/api/carts/pay', { paymentData: values, cart: shoppingCart })
          .then((res) => {
            console.log(res.data);
            setSubmitting(false);
            clearShoppingCart();
            history.push('/cart');
          })
          .catch((e) => console.log(e));
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <div style={styles.creditCard}>
            <div style={styles.cardRow}>
              <TextField
                name="number"
                variant="standard"
                type="tel"
                style={styles.cardNumberInput}
                className="number"
                placeholder="0000 0000 0000 0000"
                InputProps={{
                  inputProps: { maxLength: 16 },
                }}
              />
            </div>
            <div style={styles.cardDateCVC}>
              <div>
                <TextField
                  name="month"
                  variant="standard"
                  type="input"
                  className="month"
                  placeholder="00"
                  InputProps={{
                    inputProps: { maxLength: 2 },
                  }}
                />
                /
                <TextField
                  name="year"
                  variant="standard"
                  type="input"
                  className="year"
                  placeholder="00"
                  InputProps={{
                    inputProps: { maxLength: 2 },
                  }}
                />
              </div>
              <TextField
                name="cvc"
                variant="standard"
                type="input"
                className="cvc"
                placeholder="CVC"
                InputProps={{
                  inputProps: { maxLength: 3 },
                }}
              />
            </div>
            <div style={styles.cardRow}>
              <TextField
                name="holder"
                variant="standard"
                type="input"
                className="holder"
                style={styles.cardHolderInput}
                placeholder="Имя Фамилия"
              />
            </div>
            <div style={styles.cardRow}>
              {isSubmitting && <LinearProgress />}
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Оплатить
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

CreditCardForm.propTypes = {
  shoppingCart: shoppingCartProps.isRequired,
  clearShoppingCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  clearShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);
