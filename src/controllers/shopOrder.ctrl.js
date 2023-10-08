const { ShopOrder, ShoppingCart, sequelize } = require("../database/models");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");
const { sendMailOrderedSuccessfully } = require("../utils/email");

const getOrdersMe = async (req, res) => {
  const { userId } = req.userInfo;

  const orders = await ShopOrder.findAll({ where: { userId } });
  const response = createResponse({
    message: "Lấy tất cả đơn hàng",
    status: StatusCodes.OK,
    data: orders,
  });
  res.status(response.status).json(response);
};

const getOrderDetail = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await ShopOrder.findByPk(orderId, {
    include: {
      association: "ordersLine",
      include: {
        association: "productItem",
        include: [
          {
            association: "color",
          },
          {
            association: "product",
          },
        ],
      },
    },
  });
  if (!order) throw new NotFoundError("Đơn đặt hàng không tìm thấy!");
  const response = createResponse({
    message: "Lấy đơn hàng chi tiet",
    status: StatusCodes.OK,
    data: order,
  });
  res.status(response.status).json(response);
};
const addOrderMe = async (req, res) => {
  const { userId, email } = req.userInfo;
  const {
    ordersLine,
    address,
    fullName,
    phoneNumber,
    province,
    district,
    ward,
    productItems,
    note,
  } = req.body;
  if (
    !ordersLine ||
    !address ||
    !phoneNumber ||
    !province ||
    !district ||
    !ward
  )
    throw new BadRequestError("Vui lòng cung cấp tất cả các giá trị!");
  const orderTotal = ordersLine.reduce(
    (acc, cur) => acc + cur.price * cur.qty,
    0
  );
  try {
    let order;
    await sequelize.transaction(async (t) => {
      order = await ShopOrder.create(
        {
          orderTotal,
          orderDate: new Date(),
          address,
          fullName,
          phoneNumber,
          province,
          district,
          ward,
          note,
          userId,
          ordersLine: ordersLine,
        },
        {
          include: ["ordersLine"],
          transaction: t,
        },
        { transaction: t }
      );
    });
    const dataSendMail = {
      info: {
        orderId: order.id,
        orderTotal: order.orderTotal,
        orderDate: order.orderDate,
        address: order.address,
        fullName: order.fullName,
        phoneNumber: order.phoneNumber,
        province: order.province,
        district: order.district,
        ward: order.ward,
        note: order.note,
        email: email,
      },
      productItems,
    };
    await sendMailOrderedSuccessfully(dataSendMail);
    await ShoppingCart.destroy({ where: { userId } }, { transaction: t });
    const response = createResponse({
      message: "Đặt hàng thành công, Kiểm tra email để xác nhận đơn hàng",
      status: StatusCodes.OK,
    });
    return res.status(response.status).json(response);
  } catch (error) {
    throw new BadRequestError("Đặt hàng thất bại");
  }
};

module.exports = { addOrderMe, getOrdersMe, getOrderDetail };
