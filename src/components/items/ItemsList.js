import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import Item from './Item';

const styles = {
  spinner: {
    display: 'block',
    margin: '60px auto',
    textAlign: 'center',
  },
  noItems: {
    display: 'block',
    textAlign: 'center',
    margin: '60px auto',
    fontWeight: '300',
    fontSize: '24px',
  },
  itemList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

const ItemsList = (props) => {
  const { items, loading } = props;

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div style={styles.itemList}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <div style={styles.spinner}>
          <Spinner />
        </div>

      )
        : (items.length > 0 ? (items.map((item) => (
          <Item
            item={item}
            key={item.id}
          />
        ))) : (
          <span style={styles.noItems}>Нет товаров</span>
        ))}
    </div>
  );
};

ItemsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

ItemsList.defaultProps = {
  items: [],
};

export default ItemsList;
