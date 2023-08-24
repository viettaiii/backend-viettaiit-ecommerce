"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Shop Order
      this.hasMany(models.ShopOrder, { foreignKey: "shippingMethodId" });
    }
  }
  ShippingMethod.init(
    {  id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
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
      modelName: "ShippingMethod",   timestamps: true,
    }
  );
  return ShippingMethod;
};
