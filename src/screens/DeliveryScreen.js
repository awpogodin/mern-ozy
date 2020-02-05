/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Radio } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Title from '../components/Title';
import {setCurrentAddressInCart, setShoppingCart} from '../actions/shoppingCartActions';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';
import AddressCard from '../components/delivery/AddressCard';
import {getCountOfItems} from "../selectors/shoppingCartSelectors";

const styles = {
  list: {
    margin: '100px 0',
  },
  addressBlock: {
    margin: '0 10px',
    width: '100%',
  },
  addressType: {
    display: 'block',
    fontWeight: '500',
    fontSize: '20px',
    color: '#212121',
  },
  address: {
    display: 'block',
    fontWeight: '300',
    fontSize: '28px',
    color: '#212121',
  },
  otherAddressInput: {
    display: 'block',
    fontSize: '24px',
    fontWeight: '300',
    width: '100%',
  },
  selectedAddress: {
    display: 'block',
    fontWeight: '300',
    fontSize: '28px',
    color: '#212121',
  },
  btns: {
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

const DeliveryScreen = (props) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [otherAddressInput, setOtherAddressInput] = React.useState('');
  const [addressValid, setAddressValid] = React.useState(false);
  const [currentAddress, setCurrentAddress] = React.useState('');
  const history = useHistory();
  const { auth, shoppingCart, setCurrentAddressInCart, countOfItems } = props;
  const { user } = auth;

  useEffect(() => {
    if (countOfItems === 0) {
      history.push('/');
    }
    setSelectedValue(shoppingCart.addressType);
  }, []);

  useEffect(() => {
    if (selectedValue === 'home') {
      setCurrentAddress(user.address);
    }
    if (selectedValue === 'other') {
      setCurrentAddress(otherAddressInput);
    }
  }, [selectedValue, otherAddressInput]);

  useEffect(() => {
    if (currentAddress.trim() && currentAddress.length > 3) {
      setAddressValid(true);
      setCurrentAddressInCart(currentAddress, selectedValue);
    } else {
      setAddressValid(false);
    }
  }, [currentAddress]);

  const handleChange = e => {
    setSelectedValue(e.target.value);
  };

  const handleInputChange = e => {
    setOtherAddressInput(e.target.value);
    setSelectedValue('other');
  };

  const onClick = (value) => {
    setSelectedValue(value);
  };

  const handleBack = () => {
    history.push('/cart');
  };

  const handleForward = () => {
    history.push('/payment');
  };

  return (
    <>
      <Title title="Доставка" />
      <div style={styles.list}>
        <AddressCard
          onClick={onClick}
          value="home"
        >
          <Radio
            checked={selectedValue === 'home'}
            onChange={handleChange}
            value="home"
            name="home"
            inputProps={{ 'aria-label': 'Home' }}
          />
          <div style={styles.addressBlock}>
            <span style={styles.addressType}>
              Домашний адрес:
            </span>
            <span style={styles.address}>
              {user.address}
            </span>
          </div>
        </AddressCard>
        <AddressCard
          onClick={onClick}
          value="other"
        >
          <Radio
            checked={selectedValue === 'other'}
            onChange={handleChange}
            value="other"
            name="other"
            inputProps={{ 'aria-label': 'Other' }}
          />
          <div style={styles.addressBlock}>
            <span style={styles.addressType}>
              Другой адрес:
            </span>
            <div>
              <Input
                type="input"
                style={styles.otherAddressInput}
                value={otherAddressInput}
                onChange={handleInputChange}
                error={!addressValid && selectedValue === 'other'}
              />
            </div>
          </div>
        </AddressCard>
        {currentAddress}
      </div>
      <div style={styles.btns}>
        <Button onClick={handleBack} color="primary">Назад</Button>
        <Button
          onClick={handleForward}
          color="primary"
          disabled={!addressValid}
        >
          Продолжить
        </Button>
      </div>
    </>
  );
};

DeliveryScreen.propTypes = {
  auth: authProps.isRequired,
  shoppingCart: shoppingCartProps.isRequired,
  setCurrentAddressInCart: PropTypes.func.isRequired,
  countOfItems: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  setShoppingCart,
  setCurrentAddressInCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen);
