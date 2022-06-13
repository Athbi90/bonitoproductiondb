"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AdminConfigs", [
      {
        delivery: 1,
        cashPayment: true,
        knetPayment: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AdminConfigs", null, {});
  },
};
