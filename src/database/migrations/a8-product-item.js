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
          type: Sequelize.STRING,
          defaultValue: Sequelize.STRING,
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
          type: Sequelize.STRING,
          references: {
            model: "Colors",
            key: "id",
          },
          unique: "unique_tag",
          allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        productId: {
          type: Sequelize.STRING,
          references: {
            model: "Products",
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
