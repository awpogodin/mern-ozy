import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Title from '../components/Title';
import ItemsList from '../components/items/ItemsList';

const styles = {
  categoryBtn: {
    display: 'block',
    margin: '10px auto',
  },
};

const ItemsScreen = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const history = useHistory();
  const { category } = props;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/items/category/${category}`)
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, [category]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeRoute = e => {
    const path = e.target.parentNode.getAttribute('href') || '/';
    history.push(path);

    handleClose();
  };

  const getCategoryRus = () => {
    if (category === 'phones') return 'Телефоны';
    if (category === 'tablets') return 'Планшеты';
    if (category === 'accessories') return 'Аксессуары';
    return '';
  };

  return (
    <div>
      <Title title={getCategoryRus()} />
      <Button style={styles.categoryBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Категория
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem href="/category/phones" onClick={changeRoute}>{category === 'phones' ? (<b>Телефоны</b>) : (<span>Телефоны</span>)}</MenuItem>
        <MenuItem href="/category/tablets" onClick={changeRoute}>{category === 'tablets' ? (<b>Планшеты</b>) : (<span>Планшеты</span>)}</MenuItem>
        <MenuItem href="/category/accessories" onClick={changeRoute}>{category === 'accessories' ? (<b>Аксессуары</b>) : (<span>Аксессуары</span>)}</MenuItem>
      </Menu>
      <ItemsList items={items} loading={loading} />
    </div>
  );
};

ItemsScreen.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ItemsScreen;
