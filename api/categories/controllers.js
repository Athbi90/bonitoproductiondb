const { Category } = require("../../db/models");

// Add Category
exports.addCategory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${req.file.key}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// Edit Category
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);
    if (req.file) {
      req.body.image = `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${req.file.key}`;
    }
    await category.update(req.body);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

//Delete Category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);
    await category.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [["id"]],
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getAvailableCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [["id"]],
      where: {
        available: true,
      },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.fetchCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        code: req.query.category,
        valid: true,
      },
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
};
