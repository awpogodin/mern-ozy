import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { connect } from 'react-redux';
import { getCountOfItems } from '../../selectors/shoppingCartSelectors';
import { setShoppingCart } from '../../actions/shoppingCartActions';

const StepperComponent = props => {
  const { currentStep } = props;
  let activeStep;
  const stepper = {
    cart: {
      active: false,
      completed: false,
    },
    delivery: {
      active: false,
      completed: false,
    },
    payment: {
      active: false,
      completed: false,
    },
  };

  if (currentStep === 'cart') {
    stepper.cart.active = true;
    activeStep = 1;
  }

  if (currentStep === 'delivery') {
    stepper.cart.completed = true;
    stepper.delivery.active = true;
    activeStep = 2;
  }

  if (currentStep === 'payment') {
    stepper.cart.completed = true;
    stepper.delivery.completed = true;
    stepper.payment.active = true;
    activeStep = 3;
  }

  if (currentStep === 'final') {
    stepper.cart.completed = true;
    stepper.delivery.completed = true;
    stepper.payment.completed = true;
    activeStep = 4;
  }

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      <Step active={stepper.cart.active} completed={stepper.cart.completed} key="cart">
        <StepLabel>Корзина</StepLabel>
      </Step>
      <Step active={stepper.delivery.active} completed={stepper.delivery.completed} key="delivery">
        <StepLabel>Адрес доставки</StepLabel>
      </Step>
      <Step active={stepper.payment.active} completed={stepper.payment.completed} key="payment">
        <StepLabel>Оплата</StepLabel>
      </Step>
    </Stepper>
  );
};

StepperComponent.propTypes = {
  currentStep: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(StepperComponent);
