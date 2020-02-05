import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authProps } from '../propTypes/proptypes';

const PrivateRoute = ({ auth, children }) => {
  const { isAuthenticated } = auth;
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  return (
    <>
      {children}
    </>
  );
};

PrivateRoute.propTypes = {
  auth: authProps.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
