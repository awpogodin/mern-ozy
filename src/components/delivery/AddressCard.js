import React from 'react';
import './card.css';
import PropTypes from 'prop-types';

const styles = {
  card: {
    display: 'flex',
    margin: '15px 0',
    borderRadius: '15px',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '100px',
  },
};

const AddressCard = (props) => {
  const { children, onClick, value } = props;

  const onClickHandler = () => {
    onClick(value);
  };

  return (
    <div style={styles.card} className="card" onClick={onClickHandler}>
      {children}
    </div>
  );
}

AddressCard.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default AddressCard;
