"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product
      this.belongsTo(models.Product, { foreignKey: "productId" });
      // User
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserReview.init(
    {
      ratingValue: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserReview",
    }
  );
  return UserReview;
};
