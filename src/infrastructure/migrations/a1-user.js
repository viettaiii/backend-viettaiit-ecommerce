"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface ,Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9a-f]{64}$/i,
        },
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "client"],
        defaultValue: "client",
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verifiedDate: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      verificationToken: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      passwordToken: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      passwordTokenExpire: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
