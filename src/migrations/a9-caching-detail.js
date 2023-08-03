"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CachingProductDetails", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "products",
          key: "id",
        },
        onDelete:  'cascade',
        onUpdate: 'cascade',
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
    await queryInterface.dropTable("CachingProductDetails");
  },
};
