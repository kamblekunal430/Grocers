const User = require("../models/User");

// getting all the registered users
module.exports.get_Users = async (req, res) => {
  try {
    let user = await User.find({});
    //console.log("user", user);
    if (user) {
      res.send(user);
    } else {
      console.log("No Users found");
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status.send("Something went wrong");
  }
};

// remove the the user
module.exports.delete_User = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete({ _id: userId }).then((user) => {
    res.json({ success: true });
  });
};
