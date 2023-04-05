const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema], 
});

const Menu = mongoose.model('Menu', categorySchema);

module.exports = Menu;
