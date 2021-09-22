const Cart = require("../models/Cart");
const Item = require("../models/Item");

// getting the cart items of the user
module.exports.get_cart_items = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      console.log("No items in the cart");
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status.send("Something went wrong");
  }
};

// adding items to the cart

module.exports.post_cart_item = async (req, res) => {
  const userId = req.params.id;
  const { itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: userId });
    let item = await Item.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send("Item not found");
    }

    const price = item.price;
    const name = item.name;

    // if the cart exist for the user
    //console.log(cart);
    if (cart) {
      //console.log(cart.items);
      //console.log("updating the cart");
      let itemIndex = cart.items.findIndex((p) => p.itemId == itemId);

      //if product exists in cart update the product quantity and bill
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({ itemId, name, quantity, price });
      }

      // calculating the bill
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    }
    // if cart dones not exist create a new cart
    else {
      //console.log("creating new cart");
      const newCart = await Cart.create({
        userId,
        items: [{ itemId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong, Unable to create cart");
  }
};

// remove the items from the cart
module.exports.delete_item = async (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;

  try {
    let cart = await Cart.findOne({ userId: userId });
    let itemIndex = cart.items.findIndex((p) => p.itemId == itemId);

    // if product is found in the cart
    // remove the item and update the bill
    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.bill -= item.price * item.quantity;
      cart.items.splice(itemIndex, 1);
    }

    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
