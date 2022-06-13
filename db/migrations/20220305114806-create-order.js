"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      delivery: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "New",
      },
      payment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coupon: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      block: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      building: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flat: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
      },
      apartment: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
      },
      avenue: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
      },
      extra: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
      },
      comment: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
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
    await queryInterface.dropTable("Orders");
  },
};
