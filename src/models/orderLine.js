"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product Item
      this.belongsTo(models.ProductItem, { foreignKey: "productItemId" });

      // Shop Order
      this.belongsTo(models.ShopOrder, { foreignKey: "shopOrderId" });
    }
  }
  OrderLine.init(
    {
      qty: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderLine",
    }
  );
  return OrderLine;
};
