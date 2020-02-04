import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { authProps } from '../propTypes/proptypes';

const PrivateRoute = ({ auth, children }) => {
  const { isAuthenticated } = auth;
  const location = useLocation();
  const oldPath = location.pathname;

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
