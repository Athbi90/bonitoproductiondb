const { AdminConfig } = require("../../db/models");

// Create a config
exports.addConfig = async (req, res, next) => {
  try {
    const config = await AdminConfig.create(req.body);
    res.status(201).json(config);
  } catch (error) {
    next(error);
  }
};

// Edit Config
exports.updateConfig = async (req, res, next) => {
  try {
    const config = await AdminConfig.findByPk(req.body.configId);
    await config.update(req.body);
    res.json(config);
  } catch (error) {
    next(error);
  }
};

exports.getAdminConfig = async (req, res, next) => {
  try {
    const config = await AdminConfig.findByPk(1);
    res.json(config);
  } catch (error) {
    next(error);
  }
};

// Delete Config
// exports.deleteConfig = async (req, res, next) => {
//   try {
//     const config = await AdminConfig.findByPk(req.body.configId);
//     await config.destroy();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

exports.getConfig = async (req, res, next) => {
  try {
    const config = await AdminConfig.findByPk(1, {
      attributes: {
        include: ["delivery", "knetPayment", "cashPayment"],
      },
    });
    res.json(config);
  } catch (error) {
    next(error);
  }
};
