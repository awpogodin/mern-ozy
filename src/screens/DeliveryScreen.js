import React from 'react';
import { connect } from 'react-redux';
import { Input, Radio } from '@material-ui/core';
import Title from '../components/Title';
import { setShoppingCart } from '../actions/shoppingCartActions';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';
import AddressCard from '../components/delivery/AddressCard';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

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
  const [selectedValue, setSelectedValue] = React.useState('home');
  const [otherAddressInput, setOtherAddressInput] = React.useState('');
  const history = useHistory();
  const { auth, shoppingCard } = props;
  const { user } = auth;

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
              />
            </div>
          </div>
        </AddressCard>
      </div>
      <div style={styles.btns}>
        <Button onClick={handleBack} color="primary">Назад</Button>
        <Button onClick={handleForward} color="primary">Продолжить</Button>
      </div>
    </>
  );
};

DeliveryScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen);
