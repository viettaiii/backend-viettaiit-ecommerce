require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connectDB = require("./config/connectDB");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async (app, port) => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer(app, port);
