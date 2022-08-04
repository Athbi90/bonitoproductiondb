const { Category } = require("../../db/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

// Add Category
exports.addCategory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${req.file.key}`;
    }
    const maxOrder = await Category.count();
    const newCategory = await Category.create({
      ...req.body,
      order: maxOrder + 1,
    });
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
    await this.changeOrder(req.body.categoryId, req.body.order, next);
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
    await Category.increment(
      { order: -1 },
      {
        where: {
          order: {
            [Op.gt]: category.order,
          },
        },
      }
    );
    await category.destroy();
    console.log("Category deleted!");
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
      order: [["order"]],
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

exports.changeOrder = async (categoryId, order, next) => {
  try {
    const maxOrder = await Category.count();
    order = order < 1 ? 1 : order;
    const updatedCategory = await Category.findByPk(categoryId);
    if (updatedCategory.order > order) {
      await Category.increment(
        { order: 1 },
        {
          where: {
            order: {
              [Op.and]: [
                { [Op.gte]: order },
                { [Op.lt]: updatedCategory.order },
              ],
            },
          },
        }
      );
    } else if (updatedCategory.order < order || order >= maxOrder) {
      await Category.increment(
        { order: -1 },
        {
          where: {
            order: {
              [Op.and]: [
                { [Op.lte]: order },
                { [Op.gt]: updatedCategory.order },
              ],
            },
          },
        }
      );
    }

    await updatedCategory.update({
      order: order >= maxOrder ? maxOrder : order,
    });

    console.log("Order has been changed succesfully");
  } catch (error) {
    next(error);
  }
};
