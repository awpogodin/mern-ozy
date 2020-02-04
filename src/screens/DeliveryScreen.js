import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import { setShoppingCart } from '../actions/shoppingCartActions';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';

const DeliveryScreen = (props) => {
  const { auth, shoppingCard } = props;
  const { user } = auth;

  return (
    <>
      <Title title="Доставка" />
    </>
  );
};

DeliveryScreen.propTypes = {
  auth: authProps.isRequired,
  shoppingCart: shoppingCartProps.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen);
