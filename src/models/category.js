"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product
      this.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {  id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
      categoryName: {
        type: DataTypes.ENUM,
        values: ["IPhone", "IPad", "Mac", "Watch", "Âm thanh", "Phụ kiện"],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",   timestamps: true,
    }
  );
  return Category;
};
