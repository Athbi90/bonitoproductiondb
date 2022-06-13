"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        id: 1,
        name_en: "Aveiro",
        name_ar: "افييرو",
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652288667723aveiro-bottle.jpg",
        unitSold: 0,
        available: true,
        slug: "aveiro",
        description_en: "meow",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name_en: "Alma",
        name_ar: "الما",
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652288694361alma-bottle.jpg",
        unitSold: 0,
        available: true,
        slug: "alma",
        description_en: "meow",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name_en: "Vida",
        name_ar: "فيدا",
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652288720895vida-bottle.jpg",
        unitSold: 0,
        available: true,
        slug: "vida",
        description_en: "meow",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name_en: "Sentra",
        name_ar: "سنترا",
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652288779784santra-bottle.jpg",
        unitSold: 0,
        available: true,
        slug: "sentra",
        description_en: "meow",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name_en: "Costa Nova",
        name_ar: "كوستا نوفا",
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652288909655costa-bottle.jpg",
        unitSold: 0,
        available: true,
        slug: "costa-nova",
        description_en: "meow",
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name_en: "Fado",
        name_ar: "فادو",
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652288934372fado-bottle.jpg",
        unitSold: 0,
        available: true,
        slug: "fado",
        description_en: "meow",
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
