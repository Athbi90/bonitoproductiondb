// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addCoupon,
  updateCoupon,
  deleteCoupon,
  fetchCoupon,
  getAllCoupons,
} = require("./controllers");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllCoupons
);

router.post("/", passport.authenticate("jwt", { session: false }), addCoupon);

router.put("/", passport.authenticate("jwt", { session: false }), updateCoupon);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteCoupon
);

router.get("/getCoupon", fetchCoupon);

module.exports = router;
