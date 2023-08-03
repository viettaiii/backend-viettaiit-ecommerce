require("dotenv").config();
// Xử lí bất đồng bộ lỗi
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const routerAuth = require("./routes/auth");

const { notFoundMiddleware, errorMiddleware } = require("./middleware");
const bodyParser = require("body-parser");
const configViewEngine = require("./config/viewEngine");
app.use(bodyParser.json());

// Kết nối view engine
configViewEngine(app);
// Kết tối đến các tuyển đường
app.use("/api/v1/auth", routerAuth);

// Error middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Kết nối đến database và server
const port = process.env.PORT || 8080;
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
