"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      customer: DataTypes.STRING,
      phone: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      delivery: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      payment: DataTypes.STRING,
      coupon: DataTypes.STRING,
      area: DataTypes.STRING,
      block: DataTypes.STRING,
      street: DataTypes.STRING,
      building: DataTypes.STRING,
      flat: DataTypes.STRING,
      apartment: DataTypes.STRING,
      avenue: DataTypes.STRING,
      extra: DataTypes.STRING,
      comment: DataTypes.STRING,
      chargeId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
