const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.get("/order/:id", orderController.get_orders);
router.post("/order/:id", orderController.post_order);

module.exports = router;
