import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { setShoppingCart } from '../actions/shoppingCartActions';
import Title from '../components/Title';
import CartItemList from '../components/shoppingCart/CartItemList';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';
import { getCountOfItems, getTotalOrderAmount } from '../selectors/shoppingCartSelectors';
import CartTotalAmount from '../components/shoppingCart/CartTotalAmount';

const styles = {
  btns: {
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
  },
  btnForward: {
    marginLeft: 'auto',
  },
};

const ShoppingCartScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  const {
    auth, shoppingCart, totalOrderAmount, countOfItems,
  } = props;
  const { items } = shoppingCart;

  useEffect(() => {
    setLoading(false);
    if (countOfItems === 0) {
      history.push('/cart');
    };
  }, []);

  const handleForward = () => {
    history.push('/delivery');
  };

  return (
    <>
      <Title title="Корзина" />
      <CartItemList items={items} loading={loading} />
      <CartTotalAmount totalAmount={totalOrderAmount} />
      <div style={styles.btns}>
        <Button
          onClick={handleForward}
          style={styles.btnForward}
          color="primary"
          disabled={countOfItems === 0}
        >
          Продолжить
        </Button>
      </div>
    </>
  );
};

ShoppingCartScreen.propTypes = {
  auth: authProps.isRequired,
  shoppingCart: shoppingCartProps.isRequired,
  totalOrderAmount: PropTypes.number.isRequired,
  countOfItems: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
  totalOrderAmount: getTotalOrderAmount(state),
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
