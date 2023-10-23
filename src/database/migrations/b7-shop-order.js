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
          defaultValue: Sequelize.UUIDV4,
        },
        orderDate: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        orderTotal: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM,
          values: ["pending", "delivering", "canceled", "completed"],
          defaultValue: "pending",
        },
        userId: {
          allowNull: false,
          type: Sequelize.UUID,
   
          references: {
            model: "Users",
            key: "id",
          },
          allowNull: false,
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        addressId: {
          allowNull: false,
          type: Sequelize.UUID,
       
          references: {
            model: "Addresses",
            key: "id",
          },
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
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ShopOrders");
  },
};
