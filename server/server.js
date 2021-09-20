const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());

// used in the production to serve the client files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// connecting to the database using mongoose

const dbUrl = "mongodb://localhost:27017/GrocersDB";

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
