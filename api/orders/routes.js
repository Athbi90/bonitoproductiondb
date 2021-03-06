const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  getPrice,
  addOrder,
  updateQuantity,
  cancelOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  tapPost,
  fetchOrder,
  getCharge,
  getOrderByChargeId,
} = require("./controllers");

router.get("/", getOrders);

router.get(
  "/getorder",
  passport.authenticate("jwt", { session: false }),
  fetchOrder
);

// router.get("/price", getPrice);

router.post("/create", addOrder);

router.post("/tappost", tapPost);

router.put(
  "/updateQuantity",
  passport.authenticate("jwt", { session: false }),
  updateQuantity
);

router.put(
  "/cancel",
  passport.authenticate("jwt", { session: false }),
  cancelOrder
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  updateOrder
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteOrder
);

router.get("/checkcharge", getCharge);

router.get("/getOrderbyCharge", getOrderByChargeId);

module.exports = router;
