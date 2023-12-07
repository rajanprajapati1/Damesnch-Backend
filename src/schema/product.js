const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  smallimg:{
    type:[String],
    min:1,
    max:3,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  color: {
    type: [String],
    default: [],
  },
  categories: {
    type: [String],
    default: [],
  },
  stock: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
