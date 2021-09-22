const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const router = express.Router();

router.get("/wishlist/:id", wishlistController.get_wishlist_items);
router.post("/wishlist/:id", wishlistController.post_wishlist_item);
router.post("/wishlist/:userId/:itemId", wishlistController.add_to_cart_item);
router.delete("/wishlist/:userId/:itemId", wishlistController.delete_item);

module.exports = router;
