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
        qtyInStock: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        isSpecial: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        colorId: {
          type: Sequelize.UUID,
          references: {
            model: "colors",
            key: "id",
          },
          unique: "unique_tag",
          allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        productId: {
          type: Sequelize.UUID,
          references: {
            model: "products",
            key: "id",
          },
          unique: "unique_tag",
          allowNull: false,
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
            fields: ["colorId", "productId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductItems");
  },
};
