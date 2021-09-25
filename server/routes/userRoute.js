const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/users", userController.get_Users);
router.delete("/users/:id", userController.delete_User);

module.exports = router;
