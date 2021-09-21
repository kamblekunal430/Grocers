const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining cart schema

const CartSchema = new Schema({
  userId: {
    type: String,
  },
  items: [
    {
      itemId: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);