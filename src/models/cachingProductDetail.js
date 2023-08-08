"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CachingProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product
      this.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  CachingProductDetail.init(
    {  id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
      data: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CachingProductDetail",   timestamps: true,
    }
  );
  return CachingProductDetail;
};
