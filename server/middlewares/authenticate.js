const jwt = require("jsonwebtoken");

// middleware function to verify whether a user is logged in or not.

function authenticate(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found, authentication failed" });
  }

  try {
    // verify the token
    const decoded_User = jwt.verify(token, "jwtsecretOrPublicKey");

    //addding user from payload
    req.user = decoded_User;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
}

module.exports = authenticate;
