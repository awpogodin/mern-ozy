import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setShoppingCart } from '../actions/shoppingCartActions';
import Title from '../components/Title';
import CartItemList from '../components/shoppingCart/CartItemList';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';


const ShoppingCartScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const { auth, shoppingCart } = props;
  const { items } = shoppingCart;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <Title title="Корзина" />
      <CartItemList items={items} loading={loading} />
    </div>
  );
};

ShoppingCartScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
