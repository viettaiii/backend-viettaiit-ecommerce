"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Products",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
        },
        name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        discount: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.UUID,
          references: {
            model: "categories",
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
    await queryInterface.dropTable("Products");
  },
};
