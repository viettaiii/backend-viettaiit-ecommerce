"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShoppingCartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Shopping cart
      this.belongsTo(models.ShoppingCart, { foreignKey: "cartId", as: "cart" });

      // Product item
      this.belongsTo(models.ProductItem, {
        foreignKey: "productItemId",
        as: "productItem",
      });
    }
  }
  ShoppingCartItem.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ShoppingCartItem",
      timestamps: true,
    }
  );
  return ShoppingCartItem;
};
