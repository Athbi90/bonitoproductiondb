"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Options",
          "weight",
          {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0.25,
          },
          {
            transaction: t,
          }
        ),
        queryInterface.addColumn(
          "Orders",
          "country",
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Kuwait",
          },
          {
            transaction: t,
          }
        ),
        queryInterface.addColumn(
          "Orders",
          "city",
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "N/A",
          },
          {
            transaction: t,
          }
        ),
        queryInterface.addColumn(
          "Orders",
          "addressOne",
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "N/A",
          },
          {
            transaction: t,
          }
        ),
        queryInterface.addColumn(
          "Orders",
          "addressTwo",
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "N/A",
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Options", "weight", {
          transaction: t,
        }),
        queryInterface.removeColumn("Orders", "country", {
          transaction: t,
        }),
        queryInterface.removeColumn("Orders", "city", {
          transaction: t,
        }),
        queryInterface.removeColumn("Orders", "addressOne", {
          transaction: t,
        }),
        queryInterface.removeColumn("Orders", "addressTwo", {
          transaction: t,
        }),
      ]);
    });
  },
};
