"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "UserPaymentMethods",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
        },
        provider: { type: Sequelize.STRING },
        accountNumber: { type: Sequelize.STRING },
        expireDate: { type: Sequelize.DATE },
        isDefault: { type: Sequelize.BOOLEAN, defaultValue: false },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "users", key: "id" },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        paymentTypeId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: "paymentTypes", key: "id" },
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
            fields: ["userId", "paymentTypeId"],
          },
        ],
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserPaymentMethods");
  },
};
