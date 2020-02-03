import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setShoppingCart } from '../actions/shoppingCartActions';
import Title from '../components/Title';
import CartItemList from '../components/shoppingCart/CartItemList';

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
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  shoppingCart: PropTypes.shape({
    id: PropTypes.string,
    customerId: PropTypes.string,
    items: PropTypes.array,
    completed: PropTypes.bool,
    address: PropTypes.string,
    addressType: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
