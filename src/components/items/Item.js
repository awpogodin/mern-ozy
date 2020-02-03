import React from 'react';
import './item.css';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/shoppingCartActions';

const styles = {
  card: {
    margin: '15px',
    padding: '15px',
    borderRadius: '15px',
    width: '300px',
  },
  cardImg: {
    display: 'block',
    height: '300px',
    margin: '0 auto',
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
  const { item } = props;

  const handleAddToCart = () => {
    props.addToCart(item);
  };

  return (
    <div style={styles.card} className="item">
      <img style={styles.cardImg} src={item.imgUrl} alt="" />
      <div style={styles.infoBlock}>
        <span style={styles.category}>
          {item.category}
        </span>
        <span style={styles.title}>{item.name}</span>
      </div>
      <div style={styles.priceBlock}>
        <span style={styles.price}>
          {item.price}
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
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  shoppingCart: PropTypes.shape({
    _id: PropTypes.string,
    customerId: PropTypes.string,
    items: PropTypes.array,
    completed: PropTypes.bool,
    address: PropTypes.string,
    addressType: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  addToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
