import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Title from '../components/Title';
import CreditCardForm from '../components/payment/CreditCardForm';
import {getCountOfItems, getTotalOrderAmount} from "../selectors/shoppingCartSelectors";
import {setShoppingCart} from "../actions/shoppingCartActions";
import {authProps, shoppingCartProps} from "../propTypes/proptypes";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const styles = {
  btns: {
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
  },
};

const PaymentScreen = (props) => {
  const history = useHistory();
  const { countOfItems } = props;

  useEffect(() => {
    if (countOfItems === 0) {
      history.push('/cart');
    }
  }, []);

  const handleBack = () => {
    history.push('/delivery');
  };

  return (
    <>
      <Title title="Оплата" />
      <CreditCardForm />
      <div style={styles.btns}>
        <Button
          onClick={handleBack}
          color="primary"
        >
          Назад
        </Button>
      </div>
    </>
  );
};

PaymentScreen.propTypes = {
  countOfItems: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
