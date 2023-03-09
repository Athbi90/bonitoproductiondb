"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Multioption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Group.hasMany(models.Multioption, {
        foreignKey: "groupId",
        as: "group",
        // onDelete: "CASCADE",
      });

      models.Multioption.belongsTo(models.Option, {
        foreignKey: "optionId",
        as: "options",
      });
    }
  }
  Multioption.init(
    {
      name_en: DataTypes.STRING,
      name_ar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Multioption",
    }
  );
  return Multioption;
};
