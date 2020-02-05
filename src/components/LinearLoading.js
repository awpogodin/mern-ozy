import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

const LinearLoading = ({ loading }) => (
  <>
    {loading ? (
      <LinearProgress />
    ) : (
      <>
      </>
    )}
  </>
);

LinearLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LinearLoading;
