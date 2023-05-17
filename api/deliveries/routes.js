// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");
const s3upload = require("../../middleware/s3upload");

const {
  addDelivery,
  updateDelivery,
  getDeliveries,
  findDelivery,
  deleteDelivery,
} = require("./controllers");

router.get("/", getDeliveries);

router.post("/", passport.authenticate("jwt", { session: false }), addDelivery);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateDelivery
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteDelivery
);

router.get("/fetchdelivery", findDelivery);

module.exports = router;
