import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import { authProps } from '../propTypes/proptypes';

const styles = {
  greeting: {
    display: 'block',
    marginTop: '20vh',
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '300',
  },
};

const ProfileScreen = (props) => {
  const { auth } = props;
  const { user } = auth;

  const greeting = `Привет, ${user.name}!😊`;
  return (
    <>
      <Title title="Профиль" />
      <h1 style={styles.greeting}>{greeting}</h1>
    </>
  );
};

ProfileScreen.propTypes = {
  auth: authProps.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileScreen);
