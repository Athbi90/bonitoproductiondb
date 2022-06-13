// Dependancies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

// Model
const {
  User,
  OrderItem,
  Option,
  Order,
  Product,
  Category,
} = require("../../db/models");

// Sign up
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    // Create Payload
    const payload = {
      id: newUser.id,
      username: newUser.username,
      expiry: Date.now() + process.env.JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

// Sign in
exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    expiry: Date.now() + process.env.JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
  res.json({ token: token });
};

// fetch user
exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return user;
  } catch (error) {
    next(error);
  }
};

// Get All users
exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Fetch the top selling items in the past week
exports.topSelling = async (req, res, next) => {
  try {
    // 1.08e7 to add +03:00 GMT for Kuwaiti local time
    // 6.048e8
    const lastWeek = new Date(Date.now() - 6.048e8 + 1.08e7);
    const now = new Date(Date.now() + 1.08e7);

    const top = await OrderItem.findAll({
      where: {
        createdAt: { [Op.between]: [lastWeek, now] },
      },
      attributes: [
        "optionId",
        [sequelize.fn("sum", sequelize.col("quantity")), "totalSold"],
      ],
      group: ["optionId"],
      raw: true,
      limit: 5,
      order: [[sequelize.fn("sum", sequelize.col("quantity")), "DESC"]],
    });
    res.json(top);
  } catch (error) {
    next(error);
  }
};

// Fetch the top selling items in the past week
exports.mainStats = async (req, res, next) => {
  try {
    // 1.08e7 to add +03:00 GMT for Kuwaiti local time
    // 6.048e8 is last week in miliseconds
    const lastWeek = new Date(Date.now() - 6.048e8 + 1.08e7);
    const now = new Date(Date.now() + 1.08e7);

    const items = await OrderItem.findAll({
      where: {
        createdAt: { [Op.between]: [lastWeek, now] },
      },
      attributes: [
        // "optionId",
        [sequelize.fn("sum", sequelize.col("quantity")), "totalSold"],
      ],
      // group: ["optionId"],
      raw: true,
      // limit: 5,
      order: [[sequelize.fn("sum", sequelize.col("quantity")), "DESC"]],
    });
    const orders = await Order.findAll({
      where: {
        createdAt: { [Op.between]: [lastWeek, now] },
      },
      attributes: [
        // "id",
        [sequelize.fn("count", sequelize.col("id")), "totalOrders"],
        [sequelize.fn("sum", sequelize.col("price")), "totalPrice"],
      ],
      // group: ["id"],
      raw: true,
      // limit: 1,
      order: [[sequelize.fn("sum", sequelize.col("price")), "DESC"]],
    });

    const result = {
      items: items[0].totalSold,
      revenue: orders[0].totalPrice,
      orders: orders[0].totalOrders,
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.lowStock = async (req, res, next) => {
  try {
    const stock = await Option.findAll({
      where: {
        stock: {
          [Op.lte]: 15,
        },
      },
      include: {
        model: Product,
        as: "product",
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      },
      limit: 5,
      order: [["stock", "ASC"]],
    });
    res.json(stock);
  } catch (error) {
    next(error);
  }
};

exports.newOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        status: "New",
      },
      order: [["id", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.allcategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: "products",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [["id", "ASC"]],
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Option,
        as: "options",
        attributes: { exclude: ["createdAt", "updatedAt", "productId"] },
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};
