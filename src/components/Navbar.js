import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import { connect } from 'react-redux';
import { getUser } from '../selectors/userSelectors';
import { logout } from '../actions/userActions';
import PropTypes from "prop-types";

const styles = {
  navbar: {
    display: 'flex',
    padding: '6px',
  },
  loginBtnActive: {
    color: '#E91E63',
  },
  title: {
    textDecoration: 'none',
    color: '#212121',
    fontWeight: '300',
    fontSize: '24px',
    flexGrow: 1,
  },
};

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeRoute = (e) => {
    const path = e.target.getAttribute('href') || '/';
    history.push(path);
    handleClose();
  };

  const handleLogout = () => {
    props.logout();
    handleClose();
  };

  const { user } = props;

  return (
    <div style={styles.navbar}>
      <Link style={styles.title} to="/">
            Ozy
      </Link>
      <IconButton>
        <ShoppingCartIcon />
      </IconButton>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        { user ? (
          <FaceIcon style={styles.loginBtnActive} />
        ) : (
          <AccountCircleIcon />
        )}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { user ? (
          <div>
            <MenuItem href="/profile" onClick={changeRoute} >
              {user.email}
            </MenuItem>
            <MenuItem onClick={handleLogout} href="/login">
            Выйти
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={changeRoute} href="/login">
            Войти
          </MenuItem>
        )}

      </Menu>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    userId: PropTypes.string,
    email: PropTypes.string,
    fullname: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.number,
  }),
  logout: PropTypes.func,
};

Navbar.defaultProps = {
  user: {},
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = ({
  logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
