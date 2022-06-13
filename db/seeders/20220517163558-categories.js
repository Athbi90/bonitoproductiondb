"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        name_en: "Perfumes",
        name_ar: "عطور",
        image: "https://bonitokw.fra1.digitaloceanspaces.com/2.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name_en: "Home Fragrances",
        name_ar: "معطرات جو",
        image: "https://bonitokw.fra1.digitaloceanspaces.com/2.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
