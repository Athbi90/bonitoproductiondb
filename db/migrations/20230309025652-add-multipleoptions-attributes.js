"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Groups",
          "productId",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            references: {
              model: "Products",
              key: "id",
            },
          },
          {
            transaction: t,
          }
        ),
        queryInterface.addColumn(
          "Products",
          "multipleOptions",
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction: t }
        ),

        queryInterface.addColumn(
          "Multioptions",
          "groupId",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            references: {
              model: "Groups",
              key: "id",
            },
          },
          { transaction: t }
        ),

        queryInterface.addColumn(
          "Multioptions",
          "optionId",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            references: {
              model: "Options",
              key: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Groups", "productId", {
          transaction: t,
        }),
        queryInterface.removeColumn("Multioptions", "groupId", {
          transaction: t,
        }),
        queryInterface.removeColumn("Multioptions", "optionId", {
          transaction: t,
        }),
        queryInterface.removeColumn("Products", "multipleOptions", {
          transaction: t,
        }),
      ]);
    });
  },
};
