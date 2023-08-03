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
      // Address
      this.belongsTo(models.Address, { foreignKey: "addressId" });

      // Order Status
      this.belongsTo(models.OrderStatus, { foreignKey: "orderStatusId" });

      // Shipping method
      this.belongsTo(models.ShippingMethod, { foreignKey: "shippingMethodId" });

      // User payment method
      this.hasMany(models.UserPaymentMethod, { foreignKey: "paymentMethodId" });
    }
  }
  ShopOrder.init(
    {
      orderDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      orderTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ShopOrder",
    }
  );
  return ShopOrder;
};
