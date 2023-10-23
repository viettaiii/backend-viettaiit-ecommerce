const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Colors", [
      {
        id: "7c81009d-8081-4a7e-b668-6284d90bb9b6",
        value: "red",
      },

      {
        id: "6620d40e-35a5-4214-8bba-ed225c29ff1b",
        value: "yellow",
      },

      {
        id: "6d6135af-2423-48b0-a572-dce7306fb1c3",
        value: "gray",
      },
      {
        id: "aafe6a22-2a6f-4929-a61c-f8dfe4109ca8",
        value: "black",
      },
      {
        id: "922b2665-dc8b-4673-ae62-35a0678c817b",
        value: "violet",
      },
      {
        id: "05b2565a-9d53-4f90-9702-90f9a46e6976",
        value: "pink",
      },
      {
        id: "3cb6fb7e-2b04-4413-87ca-82450edf64bf",
        value: "orange",
      },
      {
        id: "43c71907-5a92-4a64-b08b-f05073e93df4",
        value: "white",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Colors", null, {});
  },
};
