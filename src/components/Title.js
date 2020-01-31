import React from 'react';

const styles = {
  title: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: '36px',
  },
};

const Title = (props) => {
  const { title } = props || 'Heading';
  return (
    <h2 style={styles.title}>{title}</h2>
  );
};

export default Title;
