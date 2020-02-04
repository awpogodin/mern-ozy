import PropTypes from 'prop-types';

export const authProps = PropTypes.shape({
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.shape({
    userId: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    middleName: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.number,
  }),
});

export const itemProps = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  imgUrl: PropTypes.string,
  price: PropTypes.number,
});

export const shoppingCartItemsProps = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
}));

export const shoppingCartProps = PropTypes.shape({
  id: PropTypes.string,
  customerId: PropTypes.string,
  items: shoppingCartItemsProps,
  completed: PropTypes.bool,
  address: PropTypes.string,
  addressType: PropTypes.string,
});
