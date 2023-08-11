const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Colors", [
      {
        id: "1e63c943-903e-4a33-88a5-a01f983d1499",
        value: "red",
      },

      {
        id: "e069517b-e3f5-41f3-9a59-f1b195f62ffc",
        value: "yellow",
      },

      {
        id:"f399ee56-584d-44aa-a8ad-26ef229c8e3c",
        value: "gray",
      },
      {
        id:"fcb0d500-b0d8-494a-95e1-1b2d23619770",
        value: "black",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Colors", null, {});
  },
};

