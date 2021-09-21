const Item = require("../models/Item");

// get_Items module
module.exports.get_items = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => {
      res.json(items);
    });
};

// module to create a new item
module.exports.post_item = (req, res) => {
  const newItem = new Item(req.body);
  newItem.save().then((item) => {
    res.json(item);
  });
};

// module to update the item details
module.exports.update_item = (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then((item) => {
    console.log(item);
    Item.findOne({ _id: req.params.id }).then((item) => {
      res.json(item);
    });
  });
};

// module to delete the item
module.exports.delete_item = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id }).then((item) => {
    res.json({ success: true });
  });
};
