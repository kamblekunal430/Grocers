const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Registration module
module.exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // checking if any of the field is empty
  if (!name || !email || !password) {
    res.status(400).json({
      msg: "Please enter all the details",
    });
  }

  //checking if email is valid
  if (validator.isEmail(email)) {
    console.log("email is valid");
  } else {
    return res.status(400).json({
      msg: "Please enter valid email",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      msg: "Password must be min 8 characters",
    });
  }

  // checking if the user has already registered
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    // creating new user
    const newUser = new User({ name, email, password });

    // storing the password in reverse order
    newUser.password = password.split("").reverse().join("");

    newUser.save().then((user) => {
      jwt.sign(
        { id: user._id },
        "jwtSecretOrPublicKey",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token: token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
          });
        }
      );
    });
  });
};

// Login module

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all details" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    if (!(user.password === password.split("").reverse().join(""))) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    jwt.sign(
      { id: user._id },
      "jwtSecretOrPublicKey",
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({
          token: token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
      }
    );
  });
};

// getuser module
module.exports.get_User = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.json(user);
    });
};

/* --- Sample Program to understand JWT------ */

/*
var hello = jwt.sign(
  {
    name: "Kunal",
    age: "22",
  },
  "jwtSecretOrPublicKey",
  { expiresIn: 60 }
);
console.log(hello);
jwt.verify(hello, "jwtSecretOrPublicKey", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});


*/
