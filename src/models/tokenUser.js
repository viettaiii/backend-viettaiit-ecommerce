"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TokenUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  TokenUser.init(
    {
      ip: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TokenUser",
    }
  );
  return TokenUser;
};
