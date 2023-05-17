const { Delivery, Option } = require("../../db/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

// Add Delivery
exports.addDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.create({
      ...req.body,
    });
    res.status(201).json(delivery);
  } catch (error) {
    next(error);
  }
};

// Edit Delivery
exports.updateDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByPk(req.body.deliveryId);

    await delivery.update(req.body);
    res.json(delivery);
  } catch (error) {
    next(error);
  }
};

//Delete Delivery
exports.deleteDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByPk(req.body.deliveryId);
    await delivery.destroy();
    console.log("Delivery record deleted!");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Get all deliveries
exports.getDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Find one delivery
exports.findDelivery = async (req, res, next) => {
  try {
    let totalWeight = 0;
    const prod = [];
    req.query.products.forEach((item) => prod.push(JSON.parse(item)));
    const productsList = await Promise.all(
      prod.map(async (product) => ({
        ...(await Option.findByPk(product.id, {
          raw: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        })),
        quantity: product.quantity,
      }))
    );

    productsList.forEach((item) => {
      totalWeight = totalWeight + item.weight * item.quantity;
    });

    const delivery = await Delivery.findAll({
      where: {
        weight: {
          [Op.gte]: totalWeight.toFixed(3),
        },
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
      order: [["price", "ASC"]],
    });
    res.json(delivery[0]);
  } catch (error) {
    next(error);
  }
};
