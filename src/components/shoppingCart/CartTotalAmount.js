import React from 'react';
import PropTypes from 'prop-types';
import prettify from '../../utils/prettifyNum';

const styles = {
  row: {
    display: 'flex',
    margin: '15px 0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    display: 'block',
    margin: '0 10px',
    fontWeight: '300',
    fontSize: '30px',
    color: '#212121',
  },
  amount: {
    display: 'block',
    textAlign: 'right',
    fontWeight: '500',
    fontSize: '30px',
    color: '#212121',
  },
};

const CartTotalAmount = (props) => {
  const { totalAmount } = props;
  return (
    <>
      <hr />
      <div style={styles.row}>
        <span style={styles.label}>Итого:</span>
        <span style={styles.amount}>
          {prettify(totalAmount)}
          &nbsp;
          ₽
        </span>
      </div>

    </>
  );
};

CartTotalAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default CartTotalAmount;
