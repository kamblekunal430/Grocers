const Wishlist = require("../models/Wishlist");
const Item = require("../models/Item");

// getting the all the wishlisted item of the user
module.exports.get_wishlist_items = async (req, res) => {
  const userId = req.params.id;
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
  const userId = req.params.id;
  const { itemId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId: userId });
    let item = await Item.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send("Item not found");
    }

    // if the wishlist is present or not
    if (wishlist) {
      // find the item in wishlist
      let itemIndex = wishlist.items.findIndex((p) => p.itemId == itemId);

      // if item is in wishlist
      if (itemIndex > -1) {
        return res.status(422).send({ msg: "Item already wislisted" });
      }
      wishlist.items.push({
        itemId: itemId,
        name: item.name,
        price: item.price,
        image: item.image,
      });
      wishlist = await wishlist.save();
      return res.status(201).send(wishlist);
    } else {
      // creating new wishlist
      console.log("creating new wishlist");
      const newWishlist = await Wishlist.create({
        userId,
        items: [
          {
            itemId: itemId,
            name: item.name,
            price: item.price,
            image: item.image,
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

// removing item from the wishlist

module.exports.delete_item = async (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;

  try {
    let wishlist = await Wishlist.findOne({ userId: userId });
    console.log(wishlist);
    let itemIndex = wishlist.items.findIndex((p) => p.itemId == itemId);

    if (itemIndex > -1) {
      wishlist.items.splice(itemIndex, 1);
    }

    wishlist = await wishlist.save();
    return res.status(201).send(wishlist);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
