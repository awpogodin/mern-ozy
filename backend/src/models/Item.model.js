const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

itemSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Item', itemSchema);
