// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addConfig,
  updateConfig,
  getConfig,
  getAdminConfig,
} = require("./controllers");

router.post("/", passport.authenticate("jwt", { session: false }), addConfig);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAdminConfig
);

router.put("/", passport.authenticate("jwt", { session: false }), updateConfig);

router.get("/configurations", getConfig);

module.exports = router;
