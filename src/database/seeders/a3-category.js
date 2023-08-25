const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        id: "1636e9b8-03e1-4bec-8d19-b2aea0cf13f4",
        categoryName: "IPhone",
      },
      { id: "445362d2-3525-49aa-89f8-d4cb32735283", categoryName: "IPad" },
      { id: "4f8ae939-22f2-43b1-bbd4-76331a99e3ec", categoryName: "Mac" },
      { id: "5ae8a602-da1d-4707-bd88-5ef111413814", categoryName: "Watch" },
      { id: "72c52f69-817e-4d42-920b-856fd9e2e04b", categoryName: "Âm thanh" },
      { id: "e0ffd183-6a3a-4f7a-94c7-6f896512f114", categoryName: "Phụ kiện" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
