import React from 'react';
import { Input } from '@material-ui/core';
import Title from '../components/Title';
import CreditCardForm from '../components/payment/CreditCardForm';

const styles = {};

const PaymentScreen = (props) =>
  // const { auth, shoppingCart } = props;
  (
    <>
      <Title title="Оплата" />
      <CreditCardForm />
    </>
  );
export default PaymentScreen;
