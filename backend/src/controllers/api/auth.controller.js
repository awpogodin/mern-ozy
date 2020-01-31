/* eslint consistent-return: 0 */
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model');

const router = new Router();

router.post(
  '/signup',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 5 символов')
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации',
        });
      }

      const {
        email, password, fullname, address, phone,
      } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email, password: hashedPassword, fullname, address, phone,
      });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
    }
  },
);

router.post(
  '/signin',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      );
      const aboutUser = {
        email: user.email,
        fullname: user.fullname,
        address: user.address,
        phone: user.phone,
      };
      res.json({ token, userId: user.id, ...aboutUser });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

module.exports = router;
