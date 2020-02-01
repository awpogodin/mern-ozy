import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '300',
  },
};

const Title = ({ title = 'Heading', children }) => (
  <>
    <h2 style={styles.title}>{title}</h2>
    {children}
  </>
);

Title.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

Title.defaultProps = {
  title: 'Heading',
  children: null,
};

export default Title;
