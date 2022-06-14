// Import models needed
const {
  Order,
  Product,
  Option,
  OrderItem,
  Coupon,
  Category,
  AdminConfig,
} = require("../../db/models");

const CryptoJS = require("crypto-js");
const axios = require("axios");

// Add Order
exports.addOrder = async (req, res, next) => {
  try {
    let [price, productsList] = await this.getPrice(
      req.body.products,
      res,
      next
    );

    let coupon = null;
    if (req.body.coupon) {
      coupon = await Coupon.findOne({
        where: {
          code: req.body.coupon,
          valid: true,
        },
      });
    }
    if (coupon && coupon.stock > 0) {
      price = price - price * (coupon.percent / 100) - coupon.amount;
      await coupon.update({ ...coupon, stock: coupon.stock - 1 });
    }

    const config = await AdminConfig.findByPk(1);
    const newOrder = await Order.create({
      ...req.body,
      price: price,
      delivery: config.delivery,
    });

    // Create cart of our items with orderId
    const cart = productsList.map((item) => ({
      ...item,
      optionId: item.id,
      orderId: newOrder.id,
      price: item.price - item.discountPrice,
    }));

    // Create OrderItems and deduct the quantity from options
    await OrderItem.bulkCreate(cart);
    await productsList.forEach(async (product) => {
      let item = await Option.findByPk(product.id);
      await item.update({ ...item, stock: item.stock - product.quantity });
      let prod = await Product.findByPk(item.productId);
      await prod.update({
        ...prod,
        unitSold: prod.unitSold + product.quantity,
      });
    });
    console.log(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

// Get total price of products
exports.getPrice = async (products, res, next) => {
  try {
    let price = 0;

    const productsList = await Promise.all(
      products.map(async (product) => ({
        ...(await Option.findByPk(product.id, {
          raw: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            model: Product,
            as: "product",
            attributes: ["name_ar", "name_en"],
          },
        })),
        quantity: product.quantity,
      }))
    );

    productsList.forEach((item) => {
      price = price + (+item.price - item.discountPrice) * item.quantity;
    });
    return [price, productsList];
  } catch (error) {
    next(error);
  }
};

// Update Order Items Quantity
exports.updateQuantity = async (req, res, next) => {
  try {
    await req.body.products.forEach(async (product) => {
      let option = await Option.findByPk(product.optionId);
      let item = await OrderItem.findOne({
        where: { orderId: req.body.orderId, optionId: option.id },
      });
      let prod = await Product.findByPk(option.productId);

      await option.update({
        stock: option.stock + item.quantity - product.quantity,
      });
      await item.update({ quantity: product.quantity });
      await prod.update({
        unitSold: prod.unitSold - item.quantity + product.quantity,
      });
    });

    const order = await Order.findByPk(req.body.orderId);
    const orderItems = await OrderItem.findAll({
      where: {
        orderId: req.body.orderId,
      },
      raw: true,
    });
    const [price, _] = await this.getPrice(orderItems, res, next);

    await order.update({ price: price });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Cancel Order
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    const orderItems = await OrderItem.findAll({
      where: {
        orderId: order.id,
      },
      raw: true,
      attributes: { include: ["id"] },
    });

    await orderItems.forEach(async (product) => {
      let option = await Option.findByPk(product.optionId);
      await option.update({
        stock: option.stock + product.quantity,
      });
      let item = await OrderItem.findOne({
        where: {
          id: product.id,
        },
      });
      await item.update({ quantity: 0 });
    });
    await order.update({ status: "Cancelled" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Update order details
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    req.body.price = order.price;
    await order.update({ ...req.body });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Delete order
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);

    if (order.status === "Cancelled") {
      await order.destroy();
      res.status(204).json({ message: "Order has been deleted!" }).end();
    } else {
      res
        .status(405)
        .json({ message: "Please cancel the order before delete" })
        .end();
    }
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
    });
    res.json(orders).status(200);
  } catch (error) {
    next(error);
  }
};

exports.fetchOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.query.orderId, {
      include: {
        model: Option,
        as: "order",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "id",
            "price",
            "discountPrice",
            "available",
            "stock",
            "productId",
            "image",
          ],
        },
        include: {
          model: Product,
          as: "product",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "id",
              "categoryId",
              "unitSold",
              "slug",
              "image",
              "description_en",
              "description_ar",
              "available",
            ],
          },
          include: {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "image", "available"],
            },
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Check if charge is captured.
const tapInstance = axios.create({
  baseURL: "https://api.tap.company/v2",
  headers: { Authorization: `Bearer ${process.env.SECRET_TAP_KEY}` },
});

exports.tapPost = async (req, res, next) => {
  try {
    console.log("Posting from Tap");
    console.log("BODY", req.body);

    const toBeHashedString = `x_id${
      req.body.id
    }x_amount${req.body.amount.toFixed(3)}x_currency${
      req.body.currency
    }x_gateway_reference${req.body.reference.gateway}x_payment_reference${
      req.body.reference.payment
    }x_status${req.body.status}x_created${req.body.transaction.created}`;

    const hash = CryptoJS.HmacSHA256(
      toBeHashedString,
      process.env.SECRET_TAP_KEY
    ).toString(CryptoJS.enc.Hex);

    console.log("Headers", req.headers);
    console.log("HASH", hash);
    if (hash === req.headers.hashstring) {
      console.log("Secure!");
      const orderData = JSON.parse(req.body.metadata.products);
      for (const key in orderData) {
        req.body[key] = orderData[key];
      }
      req.body.chargeId = req.body.id;
      console.log("REQ.BODY", req.body);
      await this.addOrder(req, res, next);
    } else {
      console.log("Insecure");
      res.status(400).json("Insecure");
    }
  } catch (error) {
    next(error);
  }
};

exports.getOrderByChargeId = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        chargeId: req.query.chargeId,
      },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.getCharge = async (req, res, next) => {
  try {
    const charge = await tapInstance.get(`/charges/${req.query.chargeId}`);
    res.json(charge.data);
  } catch (error) {
    next(error);
  }
};
