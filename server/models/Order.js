// Import mongoose to define our schema
const mongoose = require('mongoose');

// Define what one order document looks like in MongoDB
const orderSchema = new mongoose.Schema({

  // List of items in this order - each one is a snapshot, not a live reference
  // This way, even if a product's price changes later, the order keeps the price paid
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      type: { type: String, enum: ['flower', 'gift'], required: true },
    }
  ],

  // Total amount for the whole order
  totalAmount: {
    type: Number,
    required: true,
  },

  // Customer's name
  customerName: {
    type: String,
    required: true,
  },

  // Customer's delivery address
  address: {
    type: String,
    required: true,
  },

  // Customer's phone number for delivery contact
  phone: {
    type: String,
    required: true,
  },

  // Order status - tracks where the order is in its lifecycle
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending', // every new order starts as pending
  },

  // How the customer is paying - card (via Stripe) or cash on delivery
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    required: true,
  },

  // Whether payment has actually been received
  // Card payments are marked 'paid' only after Stripe confirms success
  // Cash payments stay 'unpaid' until the delivery person collects payment
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid',
  },

}, {
  // Adds createdAt and updatedAt automatically
  timestamps: true,
});

// Create and export the Order model
// Mongoose will create an "orders" collection in MongoDB
module.exports = mongoose.model('Order', orderSchema);