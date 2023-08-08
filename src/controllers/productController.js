const { StatusCodes } = require("http-status-codes");

const { BadRequestError, NotFoundError } = require("../errors");
const { Category, Product, ProductItem, sequelize } = require("../models");
const { createResponse } = require("../utils/createResponse");

const getProductsStatic = async (req, res) => {
  const { count, rows } = await Product.findAndCountAll({});
  const response = createResponse({
    message: "Tạo mới sản phẩm thành công",
    status: StatusCodes.OK,
    total: count,
    data: rows,
  });
  res.status(response.status).json(response);
};
const getProducts = async (req, res) => {
  res.send("Get products");
};
const createProduct = async (req, res) => {
  const { name, image, categoryId, description, price, productItems } =
    req.body;

  if (!name || !image || !categoryId || !description || !price)
    throw new BadRequestError("Vui lòng cung cấp dầy đủ thông tin!");
  const isNameHave = await Product.findOne({ where: { name } });
  if (!productItems) {
    throw new BadRequestError("Vui lòng cung cấp các sản phẩm con!");
  }
  if (isNameHave)
    throw new BadRequestError("Sản phẩm này đã tồn tại trong hệ thống!");
  const isCategoryHave = await Category.findByPk(categoryId);
  if (!isCategoryHave) {
    throw new NotFoundError(`Category với id ${categoryId} không tìm thấy!`);
  }
  req.body.slug = name;
  await sequelize.transaction(async (t) => {
    const product = await Product.create(
      { ...req.body },
      {
        include: ["productItems"],
        transaction: t,
      },
      { transaction: t }
    );
    const response = createResponse({
      message: "Tạo mới sản phẩm thành công",
      status: StatusCodes.CREATED,
      data: product,
    });
    res.status(response.status).json(response);
  });
};
const getProduct = async (req, res) => {
  const {
    params: { slug },
  } = req;
  const product = await Product.findOne({
    where: { slug },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      association: "productItems",
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });
  if (!product) throw new NotFoundError("Sản phẩm không được tìm thấy!");
  const response = createResponse({
    message: "Tạo mới sản phẩm thành công",
    status: StatusCodes.CREATED,
    data: product,
  });
  res.status(StatusCodes.OK).json(response);
};
const updateProduct = async (req, res) => {
  res.send("update product");
};
const deleteProduct = async (req, res) => {
  res.send("delete product");
};

module.exports = {
  getProducts,
  createProduct,
  getProductsStatic,
  updateProduct,
  deleteProduct,
  getProduct,
};
