"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.Product, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });
    }
  }
  Group.init(
    {
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
