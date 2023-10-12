const {
  ShopOrder,
  sequelize,
  Address,
  ShoppingCart,
} = require("../database/models");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");
const { sendMailOrderedSuccessfully } = require("../utils/email");

const getOrdersMe = async (req, res) => {
  const { userId } = req.userInfo;

  const orders = await ShopOrder.findAll({
    where: { userId },

    include: [
      {
        association: "address",
      },
    ],
    order: [["createdAt", "desc"]],
  });
  const response = createResponse({
    message: "Lấy tất cả đơn hàng",
    status: StatusCodes.OK,
    data: orders,
  });
  res.status(response.status).json(response);
};

const getOrderDetail = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await ShopOrder.findOne({
    where: { id: orderId },
    include: [
      {
        association: "address",
      },
      {
        association: "ordersLine",
        include: [
          {
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
        ],
      },
    ],
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

  const { ordersLine, address, productItems } = req.body;

  if (!ordersLine)
    throw new BadRequestError("Vui lòng cung cấp tất cả các giá trị!");
  address.userId = userId;
  const orderTotal = ordersLine.reduce(
    (acc, cur) => acc + cur.price * cur.qty,
    0
  );
  const addressExists = await Address.findOne({
    where: address,
  });
  await Address.update({ using: false }, { where: { userId } });
  if (!addressExists) {
    address.using = true;
    const newAddress = await Address.create(address);
    address.id = newAddress.id;
  } else {
    addressExists.using = true;
    await addressExists.save();
    address.id = addressExists.id;
  }

  try {
    let order;
    await sequelize.transaction(async (t) => {
      order = await ShopOrder.create(
        {
          orderTotal,
          orderDate: new Date(),
          userId,
          ordersLine: ordersLine,
          addressId: address.id,
        },
        {
          include: ["ordersLine"],
          transaction: t,
        },
        { transaction: t }
      );
      await ShoppingCart.destroy({ where: { userId } });
    });
    const dataSendMail = {
      info: {
        orderId: order.id,
        orderTotal: order.orderTotal,
        orderDate: order.orderDate,
        ...address,
        email: email,
      },
      productItems,
    };
    await sendMailOrderedSuccessfully(dataSendMail);

    const response = createResponse({
      message: "Đặt hàng thành công, Kiểm tra email để xác nhận đơn hàng",
      status: StatusCodes.OK,
      data: order,
    });
    return res.status(response.status).json(response);
  } catch (error) {
    throw new BadRequestError("Đặt hàng thất bại");
  }
};

module.exports = { addOrderMe, getOrdersMe, getOrderDetail };
