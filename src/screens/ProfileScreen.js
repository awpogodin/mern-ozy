import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getUser } from '../selectors/userSelectors';
import { logout } from '../actions/userActions';
import Title from '../components/Title';

const styles = {
  btn: {
    display: 'block',
    margin: '20px auto',
  },
};

const ProfileScreen = props => {
  const history = useHistory();
  const handleClick = () => {
    props.logout();
  };

  const { user } = props;

  return (
    <>
      {user ? (
        <>
          <Title title="Hello 😎" />
          <Title title={user.email} type="bold" />
          <Button variant="outlined" style={styles.btn} onClick={handleClick}>
            Выйти
          </Button>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

ProfileScreen.propTypes = {
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

ProfileScreen.defaultProps = {
  user: {},
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = ({
  logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
