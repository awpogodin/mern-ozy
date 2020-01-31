const User = require('../models/User.model');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (user.admin) {
    return next();
  }
  return res.status(401).json({ message: 'Нет прав администратора' });
};
