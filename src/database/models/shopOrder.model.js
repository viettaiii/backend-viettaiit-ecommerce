"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShopOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Order Line
      this.hasMany(models.OrderLine, {
        foreignKey: "shopOrderId",
        as: "ordersLine",
      });

      // Users
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.Address, { foreignKey: "addressId", as: "address" });
    }
  }
  ShopOrder.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        
      },
    
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "delivering", "canceled", "completed"],
        defaultValue: "pending",
      },
      orderDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      orderTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ShopOrder",
      timestamps: true,
    }
  );
  return ShopOrder;
};
