const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        id: uuid(),
        categoryName: "IPhone",
      },
      { id: uuid(), categoryName: "IPad" },
      { id: uuid(), categoryName: "Mac" },
      { id: uuid(), categoryName: "Watch" },
      { id: uuid(), categoryName: "Âm thanh" },
      { id: uuid(), categoryName: "Phụ kiện" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
