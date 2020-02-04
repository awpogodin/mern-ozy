import React from 'react';
import './item.css';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import { AddItemToCart } from '../../actions/shoppingCartActions';
import { shoppingCartProps, itemProps } from '../../propTypes/proptypes';
import prettify from "../../utils/prettifyNum";

const styles = {
  card: {
    margin: '15px',
    padding: '15px',
    borderRadius: '15px',
    width: '300px',
  },
  cardImgBlock: {
    height: '300px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  infoBlock: {
    display: 'block',
    margin: '15px 0',
  },
  category: {
    display: 'block',
    marginTop: '15px',
    fontSize: '18px',
    fontWeight: '300',
    color: '#9E9E9E',
  },
  title: {
    display: 'block',
    fontSize: '24px',
    fontWeight: '300',
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: '30px',
    fontWeight: '500',
  },
};

const Item = (props) => {
  const { item, shoppingCart } = props;


  const handleAddToCart = () => {
    props.AddItemToCart(item, shoppingCart);
  };

  const getStyleWithBackgroundImg = () => {
    const urlPath = `url(${item.imgUrl})`;
    return {
      ...styles.cardImgBlock,
      backgroundImage: urlPath,
    };
  };

  return (
    <div style={styles.card} className="item">
      <div style={getStyleWithBackgroundImg()} />
      <div style={styles.infoBlock}>
        <span style={styles.category}>
          {item.category}
        </span>
        <span style={styles.title}>{item.name}</span>
      </div>
      <div style={styles.priceBlock}>
        <span style={styles.price}>
          {prettify(item.price)}
            &nbsp;
            ₽
        </span>
        <IconButton onClick={handleAddToCart} color="secondary" aria-label="Добавить в корзину">
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: itemProps.isRequired,
  shoppingCart: shoppingCartProps.isRequired,
  AddItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  AddItemToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
