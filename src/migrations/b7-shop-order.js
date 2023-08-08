"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "ShopOrders",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
        },
        orderDate: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        orderTotal: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        userPaymentMethodId: {
          type: Sequelize.UUID,
          references: {
            model: "UserPaymentMethods",
            key: "id",
          },allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        addressId: {
          type: Sequelize.UUID,
          references: {
            model: "addresses",
            key: "id",
          },allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        shippingMethodId: {
          type: Sequelize.UUID,
          references: {
            model: "shippingMethods",
            key: "id",
          },allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        orderStatusId: {
          type: Sequelize.UUID,
          references: {
            model: "orderStatuses",
            key: "id",
          },allowNull: false,
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
        indexes: [
          {
            unique: true,
            fields: [
              "userPaymentMethodId",
              "shippingMethodId",
              "addressId",
              "orderStatusId",
            ],
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ShopOrders");
  },
};
