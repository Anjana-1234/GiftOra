const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ['flower', 'gift'],
    required: true,
  },

  color: {
    type: String,
    default: null,
  },

  description: {
    type: String,
    default: '',
  },

  // Available stock quantity - admin can update this
  availableQuantity: {
    type: Number,
    default: 100, // default 100 for existing products
    min: 0,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);