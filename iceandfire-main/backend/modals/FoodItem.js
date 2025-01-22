const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodItemSchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  }
},{collection:'food_items'});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
