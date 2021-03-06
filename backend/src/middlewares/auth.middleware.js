const jwt = require('jsonwebtoken');
const config = require('config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    req.user = jwt.verify(token, config.get('jwtSecret'));
    next();
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
};
