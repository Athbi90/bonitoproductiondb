// Dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");
const s3upload = require("../../middleware/s3upload");

const {
  addCategory,
  updateCategory,
  getAllCategories,
  getAvailableCategories,
  fetchCategory,
  deleteCategory,
} = require("./controllers");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllCategories
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  s3upload,
  addCategory
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  s3upload,
  updateCategory
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);

router.get("/getCategories", getAvailableCategories);

module.exports = router;
