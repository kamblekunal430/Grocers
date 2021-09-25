const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining order schema

const OrderSchema = new Schema({
  userId: {
    type: String,
    ref: "user",
  },
  items: [
    {
      itemId: {
        type: String,
        ref: "item",
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
