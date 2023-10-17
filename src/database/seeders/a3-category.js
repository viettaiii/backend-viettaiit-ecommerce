const { uuid } = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        categoryName: "IPhone",
        image: "iphone.webp",
      },
      {
        id: "5102c8b2-1dd5-481a-96e7-d61250f2ea05",
        categoryName: "IPad",
        image: "ipad.webp",
      },
      {
        id: "4dfe0b0c-eece-477e-aa19-2c15b51d1faa",
        categoryName: "Mac",
        image: "mac.webp",
      },
      {
        id: "052c5089-4a6c-4d0a-b439-ef4e957df1b8",
        categoryName: "Watch",
        image: "watch.webp",
      },
      {
        id: "b39ea7b2-cc38-4dd4-89f4-6c738903b3e0",
        categoryName: "Âm thanh",
        image: "airport.webp",
      },
      {
        id: "3f9d74d0-14c9-44d7-80b7-cd2d41104970",
        categoryName: "Phụ kiện",
        image: "phukien.webp",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
