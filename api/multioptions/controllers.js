const { Multioption, Group, Product } = require("../../db/models");

// Add Group
exports.addGroup = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.productId);
    if (product) {
      const newGroup = await Group.create({
        ...req.body,
        productId: req.body.productId,
      });
      res.status(201).json(newGroup);
    }
  } catch (err) {
    next(err);
  }
};
//Update Group
exports.updateGroup = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.body.groupId);
    await group.update(req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
};

//Delete Group
exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.body.groupId);
    await group.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Add Multioption
exports.addMultioption = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.body.groupId);
    if (group) {
      const multioptions = req.body.multioptions.map((option) => ({
        ...option,
        groupId: req.body.groupId,
        optionId: req.body.optionId,
      }));
      await Multioption.bulkCreate(multioptions);
      res.status(201).json("New options have been added!");
    }
  } catch (err) {
    next(err);
  }
};

//Update Multioption
exports.updateMultioption = async (req, res, next) => {
  try {
    const multioption = await Multioption.findByPk(req.body.multioptionId);
    await multioption.update(req.body);
    res.json(multioption);
  } catch (err) {
    next(err);
  }
};

//Delete Multioption
exports.deleteMultioption = async (req, res, next) => {
  try {
    const multioption = await Multioption.findByPk(req.body.multioptionId);
    await multioption.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
