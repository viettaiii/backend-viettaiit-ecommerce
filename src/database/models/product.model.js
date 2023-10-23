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
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      // provider
      this.belongsTo(models.Provider, {
        foreignKey: "providerId",
        as: "provider",
      });
      // Product
      this.hasMany(models.UserReview, {
        foreignKey: "productId",
        as: "reviews",
      });

      // Product Item
      this.hasMany(models.ProductItem, {
        foreignKey: "productId",
        as: "productItems",
      });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0, max: 100 },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
    }
  );
  return Product;
};
