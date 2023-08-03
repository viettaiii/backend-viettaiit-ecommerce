"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "ProductItems",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
        },
        SKU: {
          type: Sequelize.STRING,
        },
        qtyInStock: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        colorId: {
          type: Sequelize.UUID,
          references: {
            model: "colors",
            key: "id",
          },
        },
        productId: {
          type: Sequelize.UUID,
          references: {
            model: "products",
            key: "id",
          },
        },

        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["colorId", "productId"],
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductItems");
  },
};
