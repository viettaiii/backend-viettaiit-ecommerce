const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const {} = require("../controllers/payment.ctrl");
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
var paypal = require("paypal-rest-sdk");
const { BadRequestError } = require("../errors");
const { createResponse } = require("../utils/createResponse");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// router.get("/success", async (req, res) => {
//   res.json({ success: "success", req });
//   // const payerId = req.query.PayerID;
//   // const paymentId = req.query.paymentId;

//   // const execute_payment_json = {
//   //   payer_id: payerId,
//   //   transactions: [
//   //     {
//   //       amount: {
//   //         currency: "USD",
//   //         total: total.toString(),
//   //       },
//   //     },
//   //   ],
//   // };

//   // paypal.payment.execute(
//   //   paymentId,
//   //   execute_payment_json,
//   //   function (error, payment) {
//   //     if (error) {
//   //       console.log("cancle");
//   //     } else {
//   //       console.log(JSON.stringify(payment));
//   //       console.log("success");
//   //       // res.render("success");
//   //     }
//   //   }
//   // );
// });
router.post("/", async (req, res) => {
  const total = Math.floor(req.body.total / 23000)
    .toFixed(2)
    .toString();
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.FRONTEND_CLIENT_URL}/thanh-toan/thanh-cong`,
      cancel_url: `${process.env.FRONTEND_CLIENT_URL}/thanh-toan/that-bai`,
    },
    transactions: [
      {
        // item_list: {
        //   items: [
        //     {
        //       name: "item",
        //       sku: "item",
        //       price: total,
        //       currency: "USD",
        //       quantity: 1,
        //     },
        //   ],
        // },
        amount: {
          currency: "USD",
          total: total,
        },
        description: "This is the payment description.",
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw BadRequestError("PayPal error");
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          const response = createResponse({
            message: "paypal redirect",
            status: StatusCodes.OK,
            redirect_url: payment.links[i].href,
          });
          res.status(response.status).json(response);
        }
      }
    }
  });
});
module.exports = router;
