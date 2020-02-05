/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { loadCartFromBackend } from '../../actions/shoppingCartActions';
import { authProps } from '../../propTypes/proptypes';
import { getCountOfItems } from '../../selectors/shoppingCartSelectors';

const ShoppingCartBtn = props => {
  const history = useHistory();
  const { countOfItems, auth, loadCartFromBackend } = props;

  useEffect(() => {
    if (auth.isAuthenticated && countOfItems === 0) {
      loadCartFromBackend();
    }
  }, [auth]);

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
  auth: authProps.isRequired,
  countOfItems: PropTypes.number.isRequired,
  loadCartFromBackend: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  loadCartFromBackend,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartBtn);
