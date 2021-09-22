const Wishlist = require("../models/Wishlist");
const Item = require("../models/Item");
const Cart = require("../models/Cart");

// getting the all the wishlisted item of the user
module.exports.get_wishlist_items = async (req, res) => {
  const userId = req.params.userId;
  try {
    let wishlist = await Wishlist.findOne({ userId: userId });
    if (wishlist && wishlist.items.length > 0) {
      res.send(wishlist);
    } else {
      console.log("No items wishlisted");
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status.send("Something went wrong");
  }
};

// adding items to the wishlist
module.exports.post_wishlist_item = async (req, res) => {
  const userId = req.params.userId;
  const { itemId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId: userId });
    let item = await Item.findOne({ itemId: itemId });

    if (!item) {
      res.status(404).send("Item not found");
    }

    // if the wishlist is present or not
    if (wishlist) {
      // find the item in wishlist
      let itemIndex = wishlist.items.findIndex((p) => p.itemId == itemId);

      // if item is in wishlist
      if (itemIndex > -1) {
        res.status(422).send({ msg: "Item already wislisted" });
      }
      wishlist.items.push({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
      });
      wishlist = await wishlist.save();
      return res.status(201).send(wishlist);
    } else {
      // creating new wishlist
      const newWishlist = await Wishlist.create({
        userId,
        items: [
          {
            itemId: item.itemId,
            name: item.name,
            price: item.price,
          },
        ],
      });
      return res.status(201).send(newWishlist);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
};
