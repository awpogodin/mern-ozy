import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { setShoppingCart } from '../actions/shoppingCartActions';

const ShoppingCartBtn = props => {
  const { shoppingCart } = props;
  return (
    <IconButton>
      <Badge badgeContent={shoppingCart.items.length} color="secondary">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

ShoppingCartBtn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  shoppingCart: PropTypes.shape({
    id: PropTypes.string,
    customerId: PropTypes.string,
    items: PropTypes.array,
    completed: PropTypes.bool,
    address: PropTypes.string,
    addressType: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartBtn);
