const { ShoppingCart, ShoppingCartItem } = require("../database/models");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const addOrUpdateCartItemMe = async (req, res) => {
  const { userId } = req.userInfo;
  const { productItemId, qty } = req.body;
  const [shoppingCart, _] = await ShoppingCart.findOrCreate({
    where: { userId },
    defaults: {
      userId: userId,
    },
  });
  const [shoppingCartItem, created] = await ShoppingCartItem.findOrCreate({
    where: { cartId: shoppingCart.id, productItemId },
    defaults: {
      productItemId,
      cartId: shoppingCart.id,
      qty,
    },
  });

  if (!created) {
    shoppingCartItem.qty = shoppingCartItem.qty + qty;
    await shoppingCartItem.save();
  }
  const response = createResponse({
    message: "add new or update cart item",
    status: StatusCodes.OK,
    data: shoppingCartItem,
  });
  res.status(response.status).json(response);
};

const deleteCartItemMe = async (req, res) => {
  const { userId } = req.userInfo;
  const { id } = req.params;
  const shoppingCart = await ShoppingCart.findOne({
    where: { userId },
  });
  await ShoppingCartItem.destroy({
    where: { id, cartId: shoppingCart.id },
  });
  const response = createResponse({
    message: "delete cart item",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

const getCartMe = async (req, res) => {
  const { userId } = req.userInfo;
  let cart = await ShoppingCart.findOne({
    where: { userId },
    include: [
      {
        association: "cartItems",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          association: "productItem",
          attributes: {
            exclude: ["createdAt", "updatedAt", "qtyInStock", "isSpecial"],
          },
          include: [
            {
              association: "color",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              association: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      },
    ],
  });
  let count = 0;
  const total = cart.cartItems.reduce((acc, cur) => {
    count += cur.qty;
    return (
      acc +
      (cur.productItem.product.price -
        (cur.productItem.product.price * cur.productItem.product.discount) /
          100) *
        cur.qty
    );
  }, 0);

  const response = createResponse({
    message: "get all cart items of user",
    status: StatusCodes.OK,
    total: total,
    count: count,
    data: cart,
  });
  res.status(response.status).json(response);
};

module.exports = { addOrUpdateCartItemMe, getCartMe, deleteCartItemMe };
