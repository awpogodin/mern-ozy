const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  address: { type: String, default: '' },
  addressType: { type: String, default: 'Home' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

cartSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Cart', cartSchema);
