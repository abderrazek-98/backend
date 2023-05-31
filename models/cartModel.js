const mongoose = require('mongoose');
const Product=require("../models/productModel")
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
const CartSchema = new mongoose.Schema({
  items: {
    type: [CartItemSchema],
    default: []
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
   
  },
  numtable: {
    type: Number,
    required: true
  },
  confirmed: { type: Boolean, default: false },
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;