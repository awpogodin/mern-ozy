import React from 'react';

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '300',
  },
  titleBold: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '500',
  },
};

const Title = (props) => {
  const { title, type } = props || 'Heading';
  return (
    <h2 style={type === 'bold' ? styles.titleBold : styles.title}>{title}</h2>
  );
};

export default Title;
