import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { setShoppingCart } from '../../actions/shoppingCartActions';
import { authProps, shoppingCartProps } from '../../propTypes/proptypes';
import { getCountOfItems } from '../../selectors/shoppingCartSelectors';

const ShoppingCartBtn = props => {
  const history = useHistory();
  const { countOfItems } = props;

  const handleClick = () => {
    const path = '/cart';
    history.push(path);
  };

  return (
    <IconButton onClick={handleClick}>
      <Badge badgeContent={countOfItems} color="secondary">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

ShoppingCartBtn.propTypes = {
  countOfItems: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  countOfItems: getCountOfItems(state),
});

export default connect(mapStateToProps, {})(ShoppingCartBtn);
