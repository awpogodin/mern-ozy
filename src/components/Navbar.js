import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import { logoutUser, setCurrentUser } from '../actions/authActions';
import ShoppingCartBtn from './shoppingCart/ShoppingCartBtn';
import { authProps } from '../propTypes/proptypes';

const styles = {
  navbar: {
    maxWidth: '900px',
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    textDecoration: 'none',
    color: '#212121',
    fontWeight: '300',
    fontSize: '30px',
  },
  person: {
    color: '#E91E63',
  },
};

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeRoute = e => {
    const path = e.target.getAttribute('href') || '/';
    history.push(path);
    handleClose();
  };

  const handleLogout = () => {
    props.logoutUser();
    handleClose();
  };

  const { auth } = props;
  const { user } = auth;
  return (
    <div style={styles.navbar}>
      <div>
        <Link style={styles.brand} to="/">
          <h2 style={styles.brand}>Ozy</h2>
        </Link>
      </div>
      <div>
        <ShoppingCartBtn />
        <IconButton onClick={handleClick}>
          { auth.isAuthenticated ? (
            <PersonIcon style={styles.person} />
          ) : (
            <PersonOutlineIcon />
          )}
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          { auth.isAuthenticated ? (
            <div>
              <MenuItem style={{ fontWeight: '500' }} href="/profile" onClick={changeRoute}>{user.name}</MenuItem>
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem href="/login" onClick={changeRoute}>Войти</MenuItem>
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  auth: authProps.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  setCurrentUser,
  logoutUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
