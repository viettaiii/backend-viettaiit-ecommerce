const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuid(),
        name: "admin",
        email: "admin@gmail.com",
        password:
          "$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92",
        role: "admin",
        isVerified: 1,
        verifiedDate: "2023-08-05 13:43:09",
      },
      {
        id: uuid(),
        name: "user1",
        email: "user1@gmail.com",
        password:
          "$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92",
        role: "client",
        isVerified: 1,
        verifiedDate: "2023-08-05 13:43:09",
      },
      {
        id: uuid(),
        name: "user2",
        email: "user2@gmail.com",
        password:
          "$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92",
        role: "client",
        isVerified: 1,
        verifiedDate: "2023-08-05 13:43:09",
      },
      {
        id: uuid(),
        name: "viettaii2003",
        email: "viettaii2003@gmail.com",
        password:
          "$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92",
        role: "client",
        isVerified: 1,
        verifiedDate: "2023-08-05 13:43:09",
      },
      {
        id: uuid(),
        name: "test",
        email: "test@gmail.com",
        password:
          "$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92",
        role: "client",
        isVerified: 1,
        verifiedDate: "2023-08-05 13:43:09",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
