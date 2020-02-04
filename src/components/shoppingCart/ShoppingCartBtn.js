import React from 'react';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { setShoppingCart } from '../../actions/shoppingCartActions';
import { authProps, shoppingCartProps } from '../../propTypes/proptypes';

const ShoppingCartBtn = props => {
  const history = useHistory();
  const { shoppingCart } = props;

  const handleClick = () => {
    const path = '/cart';
    history.push(path);
  };

  return (
    <IconButton onClick={handleClick}>
      <Badge badgeContent={shoppingCart.items.length} color="secondary">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

ShoppingCartBtn.propTypes = {
  auth: authProps.isRequired,
  shoppingCart: shoppingCartProps.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartBtn);
