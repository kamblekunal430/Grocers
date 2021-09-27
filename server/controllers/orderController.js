const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");

// get the orders made by the user
module.exports.get_orders = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userid: userId })
    .sort({ data: -1 })
    .then((order) => {
      res.json(order);
    });
};

module.exports.post_order = async (req, res) => {
  try {
    const userId = req.params.id;
    paymentDetails = req.body;

    let cart = await Cart.findOne({ userId: userId });
    let user = await User.findOne({ _id: userId });

    if (cart) {
      console.log("Payment details", paymentDetails);
      const success = paymentDetails.payment.success;
      if (!success) {
        throw Error("Payment Failed");
      } else {
        const order = await Order.create({
          userId,
          items: cart.items,
          bill: cart.bill,
        });

        // once the order is successfull empty the cart
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
      }
    } else {
      res.status(500).send("Add items to the cart to make order");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
