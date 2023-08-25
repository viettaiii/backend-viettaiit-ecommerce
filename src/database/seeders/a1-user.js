const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuid(),
        name: "Viet Tai",
        email: "admin@gmail.com",
        password:
          "$2a$10$lsxQztoD8RcuzGFzeQ7R8ebL7NYo5aHi8f/kME4m/LqPdmAyVmOH.",
        role: "admin",
        isVerified: 1,
        verifiedDate: "2023-08-05 13:43:09",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
