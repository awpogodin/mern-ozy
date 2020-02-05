const moonAlgorithm = (num) => {
  const arr = [];
  const cardNumber = num.toString();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cardNumber.length; i++) {
    if (i % 2 === 0) {
      const m = parseInt(cardNumber[i], 10) * 2;
      if (m > 9) {
        arr.push(m - 9);
      } else {
        arr.push(m);
      }
    } else {
      const n = parseInt(cardNumber[i], 10);
      arr.push(n);
    }
  }
  // console.log(arr);
  const summ = arr.reduce((a, b) => a + b);
  return Boolean(!(summ % 10));
};

export default moonAlgorithm;
