require("dotenv").config();
// Xử lí bất đồng bộ lỗi
require("express-async-errors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();
const connectDB = require("./database/config/connectDB");
require("./database/config/passport");
const { notFoundMiddleware, errorMiddleware } = require("./middleware");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const configViewEngine = require("./database/config/viewEngine");

const createRouters = require("./routers");
app.use(
  cors({
    origin: [process.env.FRONTEND_CLIENT_URL],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// Kết nối view engine
configViewEngine(app);
// google strategy
app.use(
  session({
    secret: process.env.PASSPORT_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
