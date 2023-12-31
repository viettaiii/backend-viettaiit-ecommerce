"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });

      // shop order
      this.hasMany(models.ShopOrder, {
        foreignKey: "addressId",
        as: "orders",
      });
    }
  }
  Address.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        max: 12,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ward: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      residence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Việt Nam",
      },
      using: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
      timestamps: true,
    }
  );
  return Address;
};
