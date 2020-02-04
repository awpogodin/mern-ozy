import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setShoppingCart } from '../actions/shoppingCartActions';
import Title from '../components/Title';
import CartItemList from '../components/shoppingCart/CartItemList';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';


const ShoppingCartScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [groupedItems, setGroupedItems] = React.useState([]);
  const { shoppingCart } = props;

  useEffect(() => {
    setLoading(true);
    const items = [];
    shoppingCart.items.forEach(item => {

    });
  }, [shoppingCart]);

  return (
    <div>
      <Title title="Корзина" />
      <CartItemList items={groupedItems} loading={loading} />
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
