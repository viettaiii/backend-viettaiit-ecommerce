"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User payment method
      this.hasMany(models.UserPaymentMethod, { foreignKey: "paymentTypeId" });
    }
  }
  PaymentType.init(
    {  id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
      value: {
        type: DataTypes.ENUM,
        values: ["Cash", "CreditCard", "BankTransfer"],
        defaultValue: "Cash",
      },
    },
    {
      sequelize,
      modelName: "PaymentType",   timestamps: true,
    }
  );
  return PaymentType;
};
