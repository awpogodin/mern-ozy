/* eslint consistent-return: 0 */
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Item = require('../../models/Item.model');
const auth = require('../../middlewares/auth.middleware');
const isAdmin = require('../../middlewares/isAdmin.middleware');

const router = new Router();

router.get('/', async (req, res) => {
  const items = await Item.find({}).sort('-createdAt');
  return res.json(items);
});

router.post(
  '/',
  [
    auth,
    isAdmin,
    check('name').exists(),
    check('description').exists(),
    check('category').exists(),
    check('imgUrl').exists(),
    check('price').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные',
        });
      }

      const {
        name, description, category, imgUrl, price,
      } = req.body;

      const item = new Item({
        name, description, category, imgUrl, price,
      });

      await item.save();

      res.status(201).json({ message: 'Товар создан' });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
    }
  },
);

router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  const items = await Item.find({ category }).sort('-createdAt');
  return res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    return res.json(item);
  }
  return res.status(404).end();
});

router.patch('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    const data = {
      name: req.body.name || item.name,
      description: req.body.description || item.description,
      category: req.body.category || item.category,
      imgUrl: req.body.imgUrl || item.imgUrl,
      price: req.body.price || item.price,
    };
    if (item) {
      await Item.findByIdAndUpdate(
        req.params.id,
        data,
      );
      const updatedItem = await Item.findById(req.params.id);
      return res.status(200).json(updatedItem);
    }
    return res.status(404).end();
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
  }
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      await Item.findByIdAndDelete(req.params.id);
      return res.status(200).end();
    }
    return res.status(404).end();
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
  }
});

module.exports = router;
