const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining cart schema

const WishlistSchema = new Schema({
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
    },
  ],
});

module.exports = Wishlist = mongoose.model("cart", WishlistSchema);
