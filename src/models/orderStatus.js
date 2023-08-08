"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Shop order
      this.hasMany(models.ShopOrder, { foreignKey: "orderStatusId" });
    }
  }
  OrderStatus.init(
    {  id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "processing", "completed"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "OrderStatus",   timestamps: true,
    }
  );
  return OrderStatus;
};
