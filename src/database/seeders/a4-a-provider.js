const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Providers", [
      {
        id: "8f24916a-cf31-4b04-a2e3-95d4d8abaa12",
        providerName: "Apple",
      },
      // { id: "a7c8a31d-b01f-4c36-bd47-d971c9525bab", providerName: "Samsung" },
      // { id: "a97a963f-4075-4924-9e35-36b7b0f2cad6", providerName: "Oppo" },
      // { id: "c532f3bc-c151-4b91-ba24-d47f073f44e5", providerName: "Xiaomi" },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Providers", null, {});
  },
};
