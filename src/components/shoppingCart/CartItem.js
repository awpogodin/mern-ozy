import React from 'react';
import PropTypes from 'prop-types';

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
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default CartItem;
