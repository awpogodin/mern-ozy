import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import Spinner from '../Spinner';
import { shoppingCartItemsProps } from '../../propTypes/proptypes';

const styles = {
  root: {
    margin: '100px 0',
  },
  spinner: {
    display: 'block',
    margin: '60px auto',
    textAlign: 'center',
  },
  noItems: {
    display: 'block',
    textAlign: 'center',
    margin: '60px auto',
    fontWeight: '300',
    fontSize: '24px',
  },
};

const CartItemList = (props) => {
  const { items, loading } = props;

  return (
    <div style={styles.root}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <div style={styles.spinner}>
          <Spinner />
        </div>

      )
        : (items.length > 0 ? (items.map((item) => (
          <CartItem
            item={item}
            key={item.id}
          />
        ))) : (
          <span style={styles.noItems}>Корзина пуста</span>
        ))}
    </div>
  );
};

CartItemList.propTypes = {
  items: shoppingCartItemsProps,
  loading: PropTypes.bool.isRequired,
};

CartItemList.defaultProps = {
  items: [],
};

export default CartItemList;
