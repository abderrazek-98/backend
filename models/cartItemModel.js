const mongoose = require('mongoose');
const Product=require("../models/productModel");
const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {

    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  supplements: {
    type: [],
    
  }
});
const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;