const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

router.get("/user", authenticate, authController.get_User);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
