import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Title from '../components/Title';
import CreditCardForm from '../components/payment/CreditCardForm';
import { getCountOfItems } from '../selectors/shoppingCartSelectors';
import { setShoppingCart } from '../actions/shoppingCartActions';
import StepperComponent from '../components/stepper/StepperComponent';

const styles = {
  btns: {
    display: 'flex',
    margin: '50px 0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
  },
};

const PaymentScreen = (props) => {
  const history = useHistory();
  const { countOfItems } = props;

  useEffect(() => {
    if (countOfItems === 0) {
      history.push('/cart');
    }
  }, [countOfItems, history]);

  const handleBack = () => {
    history.push('/delivery');
  };

  return (
    <>
      <Title title="Оплата">
        <StepperComponent currentStep="payment" />
      </Title>
      <CreditCardForm />
      <div style={styles.btns}>
        <Button
          onClick={handleBack}
          color="primary"
        >
          Назад
        </Button>
      </div>
    </>
  );
};

PaymentScreen.propTypes = {
  countOfItems: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
