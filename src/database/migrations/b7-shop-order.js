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
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fullName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        province: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        district: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ward: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: "VN",
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
            model: "users",
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
