import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { authProps } from '../propTypes/proptypes';

const PrivateRoute = ({ auth, children }) => {
  const { isAuthenticated } = auth;
  const history = useHistory();
  const location = useLocation();
  const oldPath = location.pathname;

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect push from={oldPath} to="/login" />
      )}
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
