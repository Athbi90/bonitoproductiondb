"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("AdminConfigs", "delivery", {
      type: Sequelize.DECIMAL,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("AdminConfigs", "delivery", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
