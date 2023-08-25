"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "OrderLines",
      {
        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
        },
        qty: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        productItemId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "productItems",
            key: "id",
          },
          unique: "unique_tag",
          allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        shopOrderId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: "shopOrders",
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
            fields: ["productItemId", "shopOrderId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderLines");
  },
};
