"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  ShippingMethod.init(
    {
      name: {
        type: DataTypes.ENUM,
        values: ["standard shipping", "express shipping", "pickup in store"],
        defaultValue: "standard shipping",
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ShippingMethod",
    }
  );
  return ShippingMethod;
};