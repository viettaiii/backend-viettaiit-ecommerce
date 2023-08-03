"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  ShoppingCart.init(
    {},
    {
      sequelize,
      modelName: "ShoppingCart",
    }
  );
  return ShoppingCart;
};
