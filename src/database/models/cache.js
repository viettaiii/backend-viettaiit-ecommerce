"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cache extends Model {
    static associate(models) {}
  }
  Cache.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      key: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Cache",
      timestamps: true,
    }
  );
  return Cache;
};
