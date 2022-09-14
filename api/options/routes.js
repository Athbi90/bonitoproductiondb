const express = require("express");
const router = express.Router();
const passport = require("passport");
const s3upload = require("../../middleware/s3upload");

const {
  addOption,
  updateOption,
  fetchOption,
  deleteOption,
  listOptions,
  findOption,
  discount,
} = require("./controllers");

// Params middleware
router.param("optionId", async (req, res, next, optionId) => {
  const option = await fetchOption(optionId, next);
  if (option) {
    req.option = option;
    next();
  } else {
    const err = new Error("Option not found!");
    err.status = 401;
    next(err);
  }
});

// List All Options
router.get("/", listOptions);

// Add Option
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  s3upload,
  addOption
);

// Update Option
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  s3upload,
  updateOption
);

// Delete Option
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteOption
);

// Get One Option
router.get(
  "/findone",
  passport.authenticate("jwt", { session: false }),
  findOption
);

// Add discount
router.put(
  "/discount",
  passport.authenticate("jwt", { session: false }),
  discount
);

module.exports = router;
