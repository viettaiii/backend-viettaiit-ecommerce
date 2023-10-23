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
          defaultValue: Sequelize.UUIDV4,
        },
        qty: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        productItemId: {
          allowNull: false,
          type: Sequelize.UUID,

          references: {
            model: "ProductItems",
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
            model: "ShopOrders",
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
