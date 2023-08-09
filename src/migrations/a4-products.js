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
          allowNull: false,
          unique: "unique_tag",
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "unique_tag",
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        discount: {
          type: Sequelize.INTEGER,
          min: 0,
          max: 100,
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
            fields: ["name", "slug", "categoryId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
