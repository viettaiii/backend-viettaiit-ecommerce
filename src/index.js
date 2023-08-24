require("dotenv").config();
// Xử lí bất đồng bộ lỗi
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./infrastructure/config/connectDB");

const { notFoundMiddleware, errorMiddleware } = require("./middleware");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const configViewEngine = require("./infrastructure/config/viewEngine");
const createRouters = require("./routers");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// Kết nối view engine
configViewEngine(app);

// Kết tối đến các tuyển đường

createRouters(app);

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
