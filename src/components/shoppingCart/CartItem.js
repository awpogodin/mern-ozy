import React from 'react';
import { itemProps } from '../../propTypes/proptypes';

// const styles = {
//
// };

const CartItem = (props) => {
  const { item } = props;
  return (
    <div>
      <h2>{item.name}</h2>
    </div>
  );
};

CartItem.propTypes = {
  item: itemProps.isRequired,
};

export default CartItem;
