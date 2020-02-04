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

export const shoppingCartProps = PropTypes.shape({
  id: PropTypes.string,
  customerId: PropTypes.string,
  items: PropTypes.array,
  completed: PropTypes.bool,
  address: PropTypes.string,
  addressType: PropTypes.string,
});

export const itemProps = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  imgUrl: PropTypes.string,
  price: PropTypes.number,
});
