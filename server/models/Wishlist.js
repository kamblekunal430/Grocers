const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining the wishlist schema

const WishlistSchema = new Schema({
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
      image: {
        type: "String",
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,

        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
});

module.exports = Wishlist = mongoose.model("wishlist", WishlistSchema);
