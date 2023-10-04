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
      this.hasMany(models.OrderLine, { foreignKey: "shopOrderId" });


      // Users
      this.belongsTo(models.User, { foreignKey: "userId" });
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
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values:['pending','completed']
      },
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
      timestamps: true,
    }
  );
  return ShopOrder;
};
