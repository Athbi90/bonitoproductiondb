// Model
const { Product, Option, Multioption, Group } = require("../../db/models");

// Add Product
exports.addProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${req.file.key}`;
    }

    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// Get Product
exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (err) {
    next(err);
  }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findByPk(+req.body.productId);
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.productId);
    await product.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// List Products
exports.listProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        available: true,
      },
      include: [
        {
          model: Option,
          as: "options",
          attributes: { exclude: ["createdAt", "updatedAt", "productId"] },
          where: {
            available: true,
          },

          include: {
            model: Multioption,
            as: "multioption",
          },
          order: [[{ model: Multioption, as: "multioption" }, "id", "DESC"]],
        },
        {
          model: Group,
          as: "groups",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [
        ["id", "DESC"],
        [{ model: Option, as: "options" }, "createdAt", "ASC"],
        [{ model: Group, as: "groups" }, "createdAt", "DESC"],
      ],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// List Products
exports.getAvailableProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        available: true,
      },
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
