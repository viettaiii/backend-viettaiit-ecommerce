const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");
const {
  Category,
  Product,
  ProductItem,
  sequelize,
} = require("../database/models");
const { Op } = require("sequelize");
const { createResponse } = require("../utils/createResponse");
const { createSlug } = require("../utils/slug");
var format = /[`!@#$%^&*\=\[\]{};':"\\|,.<>\?~`]/;

const getProductsStatic = async (req, res) => {
  const { count, rows } = await Product.findAndCountAll({});
  const response = createResponse({
    message: "add new product successfully",
    status: StatusCodes.OK,
    total: count,
    data: rows,
  });
  res.status(response.status).json(response);
};

const getProducts = async (req, res) => {
  const { name, categoryId, discount, providerId, numericFilters, sort } =
    req.query;
  const queryObjectProduct = {};
  const queryObjectCategory = {};
  const queryObjectProvider = {};
  if (name)
    queryObjectProduct.name = {
      [Op.like]: `%${name}%`,
    };
  if (discount === "true") {
    queryObjectProduct.discount = {
      [Op.eq]: 0,
    };
  }
  if (numericFilters) {
    const regex = /\b(>|>=|=|<|<=)\b/g;
    const listFilters = numericFilters.replace(regex, (match) => `-${match}-`);
    listFilters.split(",").forEach((item) => {
      const [field, operation, value] = item.split("-");
      switch (operation) {
        case ">":
          queryObjectProduct[field] = { [Op.gt]: value };
          break;
        case ">=":
          queryObjectProduct[field] = { [Op.gte]: value };
          break;
        case "<":
          queryObjectProduct[field] = { [Op.lt]: value };
          break;
        case "<=":
          queryObjectProduct[field] = { [Op.lte]: value };
          break;
        case "=":
          queryObjectProduct[field] = { [Op.eq]: value };
          break;
        default:
          break;
      }
    });
  }
  if (categoryId)
    queryObjectCategory.id = {
      [Op.like]: `${categoryId}`,
    };
  if (providerId) {
    queryObjectProvider.id = {
      [Op.like]: `${providerId}`,
    };
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  let order = [["createdAt", "desc"]];
  if (sort) {
    order = [];
    if (sort.startsWith("-")) order.push([sort.slice(1), "desc"]);
    else order.push([sort, "asc"]);
  }
  const products = Product.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT SUM(qtyInStock) FROM ProductItems WHERE ProductItems.productId = Product.id
          )`),
          "inventoryCount",
        ],
      ],
    },
    where: queryObjectProduct,
    include: [
      {
        association: "provider",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: queryObjectProvider,
      },
      {
        association: "category",
        attributes: { exclude: ["createdAt", "updatedAt"] },

        where: queryObjectCategory,
      },
    ],
    order,
    limit,
    offset,
  });
  const count = await Product.count();

  const result = await products;

  const response = createResponse({
    message: "success",
    status: StatusCodes.OK,
    page,
    perPage: limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    data: result,
  });
  res.status(response.status).json(response);
};

const createProduct = async (req, res) => {
  const { name, image, categoryId, description, price, productItems } =
    req.body;
  if (name.match(format)) {
    throw new BadRequestError("name must can`t contain special characters");
  }
  if (!name || !image || !categoryId || !description || !price)
    throw new BadRequestError("please provide info");
  const isSlugHave = await Product.findOne({
    where: { slug: createSlug(name) },
  });
  if (!productItems) {
    throw new BadRequestError("please provide sub product");
  }
  if (isSlugHave)
    throw new BadRequestError(`name with ${name} is already in use`);
  const isCategoryHave = await Category.findByPk(categoryId);
  if (!isCategoryHave) {
    throw new NotFoundError(`Category with id ${categoryId} not found!`);
  }

  req.body.image = image;
  req.body.slug = createSlug(name);
  await sequelize.transaction(async (t) => {
    const product = await Product.create(
      { ...req.body, productItems },
      {
        include: ["productItems"],
        transaction: t,
      },
      { transaction: t }
    );

    const response = createResponse({
      message: "add new product successfully",
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
    message: "get product detail successfully",
    status: StatusCodes.CREATED,
    data: product,
  });
  res.status(StatusCodes.OK).json(response);
};

const updateProduct = async (req, res) => {
  const {
    params: { slug },
    body: { image, categoryId, description, price, productItems },
  } = req;

  const product = await Product.findOne({ where: { slug } });
  if (!product) {
    throw new NotFoundError("product not found");
  }
  // product.name = name;
  product.image = image;
  product.categoryId = categoryId;
  product.description = description;
  product.price = price;
  // product.slug = createSlug(name);

  // Luw product Items
  // return res.json(productItems);
  for (const productItem of productItems) {
    const productItemExist = await ProductItem.findOne({
      where: {
        productId: product.id,
        id: productItem.id ? productItem.id : null,
      },
    });
    if (productItemExist) {
      productItemExist.qtyInStock = productItem.qtyInStock;
      productItemExist.image = productItem.image;
      productItemExist.isSpecial = productItem.isSpecial;
      productItemExist.colorId = productItem.colorId;
      await productItemExist.save();
    } else {
      await ProductItem.create({
        image: productItem.image,
        qtyInStock: productItem.qtyInStock,
        colorId: productItem.colorId,
        isSpecial: productItem.isSpecial,
        productId: product.id,
      });
    }
  }
  await product.save();
  const response = createResponse({
    message: "updated successfully product",
    status: StatusCodes.OK,
    data: product,
  });
  res.status(response.status).json(response);
};

// delete one product
const deleteProduct = async (req, res) => {
  const {
    params: { slug },
  } = req;
  const product = await Product.findOne({ where: { slug } });
  if (!product) {
    throw new NotFoundError("product not found");
  }
  await product.destroy();
  const response = createResponse({
    message: "deleted successfully product",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

// add productItem to one product
const addProductItem = async (req, res) => {
  const {
    params: { slug },
    body: { colorId, image, qtyInStock },
  } = req;
  if (!colorId) throw new BadRequestError("please provide a color");
  if (!image) throw new BadRequestError("please provide a image");
  req.body.image = process.env.BACKEND_URL + "/static/uploads/" + image;
  if (!qtyInStock)
    throw new BadRequestError("please provide a quantity in stock");
  const product = await Product.findOne({ where: { slug } });
  if (!product) {
    throw new NotFoundError("product not found");
  }
  const isExistItem = await ProductItem.findOne({
    where: { colorId, productId: product.id },
  });
  if (isExistItem) throw new ConflictError("product already in use");
  req.body.productId = product.id;
  await ProductItem.create({ ...req.body });
  const response = createResponse({
    message: "added successfully product item",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

const deleteManyProduct = async (req, res) => {
  const { slugs } = req.body;
  await Product.destroy({ where: { slug: slugs } });
  const response = createResponse({
    message: "deleted successfully many product",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
module.exports = {
  getProducts,
  createProduct,
  getProductsStatic,
  updateProduct,
  deleteProduct,
  getProduct,
  addProductItem,
  deleteManyProduct,
};
