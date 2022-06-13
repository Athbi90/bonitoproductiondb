"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many-to-Many relation between Orders and Items
      models.Order.belongsToMany(models.Option, {
        through: OrderItem,
        foreignKey: "orderId",
        as: "order",
        onDelete: "CASCADE",
      });

      models.Option.belongsToMany(models.Order, {
        through: OrderItem,
        foreignKey: "optionId",
        as: "items",
      });
    }
  }
  OrderItem.init(
    {
      quantity: DataTypes.INTEGER,
      extraCharge: DataTypes.DECIMAL,
      comment: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
