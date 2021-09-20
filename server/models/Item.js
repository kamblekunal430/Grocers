const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining item schema

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
