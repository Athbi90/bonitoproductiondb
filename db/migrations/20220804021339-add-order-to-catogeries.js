"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Categories", "order", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "order");
  },
};
