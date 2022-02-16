const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  }
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
