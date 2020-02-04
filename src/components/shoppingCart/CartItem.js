/* eslint-disable no-shadow */
import React from 'react';
import './cartItem.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { AddItemToCart, removeAllOfItemFromCart, removeItemFromCart } from '../../actions/shoppingCartActions';
import { itemProps, shoppingCartProps } from '../../propTypes/proptypes';
import prettify from '../../utils/prettifyNum';

const styles = {
  item: {
    display: 'flex',
    margin: '15px 0',
    borderRadius: '5px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100px',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '5px',
  },
  itemImg: {
    height: '60px',
    width: '60px',
    marginRight: '5px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  itemCategory: {
    display: 'block',
    margin: '5px 0',
    fontWeight: '500',
    fontSize: '16px',
    color: '#9E9E9E',
    cursor: 'pointer',
  },
  itemName: {
    display: 'block',
    fontWeight: '300',
    fontSize: '24px',
    color: '#212121',
  },
  itemCount: {
    display: 'block',
    margin: '0 10px',
    fontWeight: '300',
    fontSize: '18px',
    color: '#212121',
  },
  itemPrice: {
    display: 'block',
    minWidth: '130px',
    textAlign: 'right',
    margin: '0 20px',
    fontWeight: '500',
    fontSize: '26px',
    color: '#212121',
  },
};

const CartItem = (props) => {
  const {
    item, AddItemToCart, removeItemFromCart, removeAllOfItemFromCart, shoppingCart,
  } = props;
  const history = useHistory();
  const {
    name, imgUrl, category, price, count,
  } = item;

  const changeRouteCategory = e => {
    const path = `/category/${e.currentTarget.innerHTML}`;
    history.push(path);
  };

  const handleAdd = () => {
    AddItemToCart(item, shoppingCart);
  };

  const handleRemove = () => {
    removeItemFromCart(item, shoppingCart);
  };

  const handleRemoveAllOfItem = () => {
    removeAllOfItemFromCart(item, shoppingCart);
  };

  const getStyleWithBackgroundImg = () => {
    const urlPath = `url(${imgUrl})`;
    return {
      ...styles.itemImg,
      backgroundImage: urlPath,
    };
  };

  return (
    <div style={styles.item} className="item">
      <div style={styles.left}>
        <div style={getStyleWithBackgroundImg()} />
        <div>
          <span onClick={changeRouteCategory} style={styles.itemCategory}>{category}</span>
          <span style={styles.itemName}>{name}</span>
        </div>
      </div>
      <div style={styles.right}>
        <IconButton onClick={handleAdd} aria-label="add">
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton onClick={handleRemove} aria-label="remove">
          <RemoveCircleOutlineIcon />
        </IconButton>

        <span style={styles.itemCount}>
          {count}
          x
        </span>
        <span style={styles.itemPrice}>
          {prettify(price)}
          &nbsp;
          ₽
        </span>
        <IconButton onClick={handleRemoveAllOfItem} aria-label="remove">
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  shoppingCart: shoppingCartProps.isRequired,
  item: itemProps.isRequired,
  AddItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  removeAllOfItemFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  AddItemToCart,
  removeItemFromCart,
  removeAllOfItemFromCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
