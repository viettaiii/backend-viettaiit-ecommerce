"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      this.belongsTo(models.User, { foreignKey: "userId" });

      // Product
      this.belongsTo(models.Product, { foreignKey: "productId" });

      // Shopping cart item
      this.hasMany(models.ShoppingCartItem, { foreignKey: "productItemId" });
    }
  }
  ProductItem.init(
    {
      SKU: {
        type: DataTypes.STRING,
      },
      qtyInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductItem",
    }
  );
  return ProductItem;
};
