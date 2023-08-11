require("dotenv").config();
// Xử lí bất đồng bộ lỗi
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const routerAuth = require("./routes/auth");
const routerProducts = require("./routes/products");
const routerUpload = require("./routes/upload");

const { notFoundMiddleware, errorMiddleware } = require("./middleware");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const configViewEngine = require("./config/viewEngine");
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
app.get("/auth/verify-email", (req, res) => {
  res.render("verifyEmail.ejs");
});
// Kết tối đến các tuyển đường
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/products", routerProducts);
app.use("/api/v1/upload", routerUpload);

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
