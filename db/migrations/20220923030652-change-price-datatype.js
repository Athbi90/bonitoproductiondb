"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Options",
          "price",
          {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Options",
          "discountPrice",
          {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Orders",
          "price",
          {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "OrderItems",
          "price",
          {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Coupons",
          "amount",
          {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Options",
          "price",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Options",
          "discountPrice",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Orders",
          "price",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "OrderItems",
          "price",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Coupons",
          "amount",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
