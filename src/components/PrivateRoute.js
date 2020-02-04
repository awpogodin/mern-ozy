import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authProps } from '../propTypes/proptypes';

const PrivateRoute = ({ auth, children }) => {
  if (auth.isAuthenticated) {
    return (
      <>
        {children}
      </>
    );
  }
  return (
    <Redirect to="/login" />
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
