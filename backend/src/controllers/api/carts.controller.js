/* eslint consistent-return: 0 */
const { Router } = require('express');
const Cart = require('../../models/Cart.model');
const auth = require('../../middlewares/auth.middleware');
const isAdmin = require('../../middlewares/isAdmin.middleware');

const router = new Router();


// @route GET api/carts/
// @desc Get all carts
// @access Private
router.get('/', auth, async (req, res) => {
  const carts = await Cart.find({});
  return res.json(carts);
});

// @route POST api/carts/
// @desc Create cart
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      items, customerId, address, addressType,
    } = req.body;
    const cart = new Cart({
      items, customerId, address, addressType,
    });

    await cart.save();

    res.status(201).json({ message: 'Корзина создана' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
  }
});

// @route GET api/carts/:id
// @desc Get cart by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (cart) {
    return res.json(cart);
  }
  return res.status(404).end();
});

// @route PATCH api/carts/:id
// @desc Update cart by id
// @access Private
router.patch('/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    const data = {
      customerId: req.body.customerId || cart.customerId,
      items: req.body.items || cart.items,
      address: req.body.address || cart.address,
      addressType: req.body.addressType || cart.addressType,
      completed: req.body.completed || cart.completed,
    };
    if (cart) {
      await Cart.findByIdAndUpdate(
        req.params.id,
        data,
      );
      const updatedCart = await Cart.findById(req.params.id);
      return res.status(200).json(updatedCart);
    }
    return res.status(404).end();
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
  }
});

// @route DELETE api/carts/:id
// @desc Delete cart by id
// @access Private
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      await Cart.findByIdAndDelete(req.params.id);
      return res.status(200).end();
    }
    return res.status(404).end();
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e });
  }
});

module.exports = router;
