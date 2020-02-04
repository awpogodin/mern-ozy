/* eslint consistent-return: 0 */
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model');
const auth = require('../../middlewares/auth.middleware');

const router = new Router();


// @route GET api/auth/
// @desc Get user info by token (jwt)
// @access Private
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
      const {
        email, name, surname, middleName, address, phone,
      } = user;
      res.status(200).json({
        email, name, surname, middleName, address, phone,
      });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
    }
  },
);

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 5 символов')
      .isLength({ min: 5 }),
    check('name', 'Введите имя').exists(),
    check('surname', 'Введите фамилию').exists(),
    check('middleName', 'Введите отчество').exists(),
    check('address', 'Введите адрес').exists(),
    check('phone', 'Некорректный номер').isMobilePhone('ru-RU'),
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
        email, password, name, surname, middleName, address, phone,
      } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ email: 'Пользователь уже зарегистрирован' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email, password: hashedPassword, name, surname, middleName, address, phone,
      });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
    }
  },
);


// @route POST api/auth/login
// @desc Login user
// @access Public
router.post(
  '/login',
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
        return res.status(400).json({ email: 'Email не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ password: 'Неверный пароль' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }, // '1h'
      );
      const aboutUser = {
        email: user.email,
        name: user.name,
        surname: user.surname,
        middleName: user.middleName,
        address: user.address,
        phone: user.phone,
      };
      res.json({ token, userId: user.id, aboutUser });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

module.exports = router;
