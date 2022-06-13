"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Options", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discountPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      option_en: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      option_ar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      minimum: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Options");
  },
};
