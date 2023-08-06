"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Category
      this.belongsTo(models.Category, { foreignKey: "categoryId" });

      // Product
      this.hasMany(models.UserReview, { foreignKey: "productId" });

      // Product Item
      this.hasMany(models.ProductItem, { foreignKey: "productId" });

      // Caching product detail
      this.hasMany(models.CachingProductDetail, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (product, options) => {
          product.slug = product.slug.split(" ").join("-");
        },
      },
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
