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
      // Color
      this.belongsTo(models.Color, { foreignKey: "colorId", as: "color" });

      // Product
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });

      // Shopping cart item
      this.hasMany(models.ShoppingCartItem, { foreignKey: "productItemId" });

      // Order line
      this.hasMany(models.OrderLine, { foreignKey: "productItemId" , as: "ordersLine", });
    }
  }
  ProductItem.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      qtyInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isSpecial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductItem",
      timestamps: true,
    }
  );
  return ProductItem;
};
