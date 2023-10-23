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
      this.belongsTo(models.ProductItem, {
        foreignKey: "productItemId",
        as: "productItem",
      });

      // Shop Order
      this.belongsTo(models.ShopOrder, {
        foreignKey: "shopOrderId",
        as: "shopOrder",
      });
    }
  }
  OrderLine.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderLine",
      timestamps: true,
    }
  );
  return OrderLine;
};
