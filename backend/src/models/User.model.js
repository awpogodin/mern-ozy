const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  middleName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', userSchema);
