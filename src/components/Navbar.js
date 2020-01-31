import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = {
  navbar: {
    display: 'flex',
    padding: '6px',
  },
  menuButton: {},
  title: {
    textDecoration: 'none',
    color: '#212121',
    fontWeight: '300',
    fontSize: '24px',
    flexGrow: 1,
  },
};

const Navbar = () => {
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
  };

  return (
    <div style={styles.navbar}>
      <Link style={styles.title} to="/">
            Ozy
      </Link>
      <IconButton>
        <ShoppingCartIcon style={styles.cart} />
      </IconButton>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={changeRoute} href="/login">
          Войти
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
