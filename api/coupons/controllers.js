const { Coupon } = require("../../db/models");

// Add Coupon
exports.addCoupon = async (req, res, next) => {
  try {
    req.body.code = req.body.code.toUpperCase();
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    next(error);
  }
};

// Edit Coupon
exports.updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.body.couponId);
    req.body.code = req.body.code.toUpperCase();
    await coupon.update(req.body);
    res.json(coupon);
  } catch (error) {
    next(error);
  }
};

// Delete Coupon
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.body.couponId);
    await coupon.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.findAll({
      order: [["id"]],
    });
    res.json(coupons);
  } catch (error) {
    next(error);
  }
};

exports.fetchCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({
      where: {
        code: req.query.coupon,
        valid: true,
      },
    });
    res.json(coupon);
  } catch (error) {
    next(error);
  }
};
