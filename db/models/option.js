"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Option.belongsTo(models.Product, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });
    }
  }
  Option.init(
    {
      option_en: DataTypes.STRING,
      option_ar: DataTypes.STRING,
      price: DataTypes.INTEGER,
      minimum: DataTypes.INTEGER,
      discountPrice: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Option",
    }
  );
  return Option;
};
