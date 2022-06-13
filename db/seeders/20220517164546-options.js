"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Options", [
      {
        id: 1,
        price: 20,
        discountPrice: 0,
        option_en: "50 ml",
        option_ar: "٥٠ ميلي",
        stock: 50,
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652289374347fado-bottle.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 1,
      },

      {
        id: 2,
        price: 18,
        discountPrice: 1,
        option_en: "50 ml",
        option_ar: "٥٠ ميلي",
        stock: 50,
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652289501651costa-bottle.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 2,
      },
      {
        id: 3,
        price: 20,
        discountPrice: 2,
        option_en: "50 ml",
        option_ar: "٥٠ ميلي",
        stock: 50,
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652289548121santra-bottle.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 3,
      },
      {
        id: 4,
        price: 17,
        discountPrice: 0,
        option_en: "50 ml",
        option_ar: "٥٠ ميلي",
        stock: 50,
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652289626855vida-bottle.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 4,
      },
      {
        id: 5,
        price: 17,
        discountPrice: 0,
        option_en: "50 ml",
        option_ar: "٥٠ ميلي",
        stock: 50,
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652289676338aveiro-bottle.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 5,
      },
      {
        id: 6,
        price: 25,
        discountPrice: 2,
        option_en: "100 ml",
        option_ar: "١٠٠ ميلي",
        stock: 50,
        image:
          "https://bonitokw.fra1.digitaloceanspaces.com/1652289726626alma-bottle.jpg",
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Options", null, {});
  },
};
