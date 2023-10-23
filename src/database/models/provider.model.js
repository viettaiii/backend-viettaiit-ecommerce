"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product
      this.hasMany(models.Product, {
        foreignKey: "providerId",
        as: "provider",
      });
    }
  }
  Provider.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        
      },
      providerName: {
        type: DataTypes.ENUM,
        values: ["Apple", "Samsung", "Oppo", "Xiaomi"],
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Provider",
      timestamps: true,
    }
  );
  return Provider;
};
