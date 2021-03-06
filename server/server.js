const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoute = require("./routes/authRoute");
const itemsRoute = require("./routes/itemsRoute");
const cartRoute = require("./routes/cartRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoute);
app.use("/api", itemsRoute);
app.use("/api", cartRoute);
app.use("/api", wishlistRoute);
app.use("/api", orderRoute);
app.use("/api", userRoute);

// used in the production to serve the client files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}
app.get("/", (req, res) => {
  res.send("Welcome to the Grocers server");
});

// connecting to the database using mongoose

const dbUrl = "mongodb://mongo:27017/GrocersDB";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    //console.log(result);
    console.log("Connected to the Database");
    app.listen(PORT, () => {
      console.log("Server running on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
