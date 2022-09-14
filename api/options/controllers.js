const { Product, Option } = require("../../db/models");

// Add Option
exports.addOption = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${req.file.key}`;
    }
    const product = await Product.findByPk(req.body.productId);
    if (product) {
      const newOption = await Option.create(req.body);
      res.status(201).json(newOption);
    }
  } catch (err) {
    next(err);
  }
};

// Get Option
exports.fetchOption = async (optionId, next) => {
  try {
    const option = await Option.findByPk(optionId);
    return option;
  } catch (err) {
    next(err);
  }
};

// Update Option
exports.updateOption = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${req.file.key}`;
    }
    const option = await Option.findByPk(req.body.optionId);
    await option.update(req.body);
    res.json(option);
  } catch (err) {
    next(err);
  }
};

// Delete Option
exports.deleteOption = async (req, res, next) => {
  try {
    const option = await Option.findByPk(req.body.optionId);
    await option.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// List Options
exports.listOptions = async (req, res, next) => {
  try {
    const options = await Option.findAll({
      where: {
        available: true,
      },
      include: {
        model: Product,
        as: "product",
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      },
    });
    res.json(options);
  } catch (err) {
    next(err);
  }
};

exports.findOption = async (req, res, next) => {
  try {
    const option = await Option.findByPk(req.query.optionId, {
      include: {
        model: Product,
        as: "product",
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      },
    });

    res.json(option);
  } catch (error) {
    next(error);
  }
};

exports.discount = async (req, res, next) => {
  try {
    const discount = req.body.discount / 100;
    await req.body.options.forEach(async (item) => {
      let option = await Option.findByPk(item.optionId);
      await option.update({
        discountPrice: option.price * discount,
      });
    });
    res.json({ message: "Discount is placed!" });
  } catch (error) {
    next(error);
  }
};
