"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // TokenUser
      this.hasOne(models.TokenUser, {
        foreignKey: "userId",
      });

      // UserReview
      this.hasMany(models.UserReview, { foreignKey: "userId" });

      // Address
      this.hasOne(models.Address, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9a-f]{64}$/i,
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "client"],
        defaultValue: "client",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      passwordToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      passwordTokenExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
