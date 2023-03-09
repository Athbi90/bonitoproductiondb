"use strict";
const SequelizeSlugify = require("sequelize-slugify");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Option, {
        as: "options",
        foreignKey: {
          name: "productId",
        },
      });
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
        // onDelete: "CASCADE",
      });
      Product.hasMany(models.Group, {
        as: "groups",
        foreignKey: {
          name: "productId",
        },
      });
    }
  }
  Product.init(
    {
      name_en: DataTypes.STRING,
      name_ar: DataTypes.STRING,
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
      description_en: DataTypes.STRING,
      description_ar: DataTypes.STRING,
      unitSold: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      multipleOptions: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  SequelizeSlugify.slugifyModel(Product, {
    source: ["name_en"],
  });
  return Product;
};
