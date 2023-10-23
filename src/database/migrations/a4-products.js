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
          type: Sequelize.STRING,
          defaultValue: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "unique_tag",
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
       
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
          type: Sequelize.STRING,
          references: {
            model: "Categories",
            key: "id",
          },
          allowNull: false,
          unique: "unique_tag",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        providerId: {
          type: Sequelize.STRING,
          references: {
            model: "Providers",
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
            fields: ["name", "slug", "categoryId", "providerId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
