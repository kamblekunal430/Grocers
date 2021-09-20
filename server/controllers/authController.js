const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // checking if any of the field is empty
  if (!name || !email || !password) {
    res.status(400).json({
      msg: "Please enter all the details",
    });
  }

  // checking if the user has already registered
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(400).json({
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
            },
          });
        }
      );
    });
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
