"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "UserReviews",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
        },
        ratingValue: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
          unique: "unique_tag",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        productId: {
          type: Sequelize.UUID,
          references: {
            model: "products",
            key: "id",
          },
          allowNull: false,
          unique: "unique_tag",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["userId", "productId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserReviews");
  },
};
