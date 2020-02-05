import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { setShoppingCart } from '../actions/shoppingCartActions';
import Title from '../components/Title';
import CartItemList from '../components/shoppingCart/CartItemList';
import { authProps, shoppingCartProps } from '../propTypes/proptypes';
import { getCountOfItems, getTotalOrderAmount } from '../selectors/shoppingCartSelectors';
import CartTotalAmount from '../components/shoppingCart/CartTotalAmount';
import StepperComponent from '../components/stepper/StepperComponent';
import LinearLoading from '../components/LinearLoading';

const styles = {
  btns: {
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
  },
  btnForward: {
    marginLeft: 'auto',
  },
};

const ShoppingCartScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const history = useHistory();
  const {
    shoppingCart, totalOrderAmount, countOfItems, auth,
  } = props;
  const { items } = shoppingCart;

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleForward = () => {
    if (auth.isAuthenticated) {
      setIsSubmitting(true);
      axios
        .post('/api/carts', shoppingCart)
        .then(() => {
          setIsSubmitting(false);
          history.push('/delivery');
        })
        .catch((e) => {
          setIsSubmitting(false);
          console.log(e);
        });
    } else {
      history.push('/login');
    }
  };

  return (
    <>
      <Title title="Корзина">
        <StepperComponent currentStep="cart" />
      </Title>
      <CartItemList items={items} loading={loading} />
      <CartTotalAmount totalAmount={totalOrderAmount} />
      <div style={styles.btns}>
        <Button
          onClick={handleForward}
          style={styles.btnForward}
          color="primary"
          disabled={countOfItems === 0}
        >
          Продолжить
        </Button>
      </div>
      <LinearLoading loading={isSubmitting} />
    </>
  );
};

ShoppingCartScreen.propTypes = {
  auth: authProps.isRequired,
  shoppingCart: shoppingCartProps.isRequired,
  totalOrderAmount: PropTypes.number.isRequired,
  countOfItems: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingCart: state.shoppingCart,
  totalOrderAmount: getTotalOrderAmount(state),
  countOfItems: getCountOfItems(state),
});

const mapDispatchToProps = ({
  setShoppingCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
