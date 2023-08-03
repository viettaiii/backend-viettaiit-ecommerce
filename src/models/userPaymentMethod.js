"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Payment types
      this.belongsTo(models.PaymentType, { foreignKey: "paymentTypeId" });

      // User
      this.belongsTo(models.User, { foreignKey: "userId" });

      // Shop Order
      this.belongsTo(models.ShopOrder, { foreignKey: "paymentMethodId" });
    }
  }
  UserPaymentMethod.init(
    {
      provider: { type: DataTypes.STRING },
      accountNumber: { type: DataTypes.STRING },
      expireDate: { type: DataTypes.DATE },
      isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "UserPaymentMethod",
    }
  );
  return UserPaymentMethod;
};
