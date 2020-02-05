const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    count: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
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
