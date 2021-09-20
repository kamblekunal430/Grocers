const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/cart/:id", cartController.get_cart_items);
router.post("/cart/:id", cartController.post_cart_item);
router.delete("/cart/:userId/:itemId", cartController.delete_item);

module.exports = router;
