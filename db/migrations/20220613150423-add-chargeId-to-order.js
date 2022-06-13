"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "chargeId", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "N/A",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "chargeId");
  },
};
