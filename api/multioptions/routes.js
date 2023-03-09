const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addGroup,
  addMultioption,
  updateMultioption,
  deleteMultioption,
  updateGroup,
  deleteGroup,
} = require("./controllers");

// Add Group
router.post(
  "/group",
  passport.authenticate("jwt", { session: false }),
  addGroup
);

// Update Option
router.put(
  "/group",
  passport.authenticate("jwt", { session: false }),
  updateGroup
);

// Delete Option
router.delete(
  "/group",
  passport.authenticate("jwt", { session: false }),
  deleteGroup
);

// Add Option
router.post(
  "/multioption",
  passport.authenticate("jwt", { session: false }),
  addMultioption
);

// Update Option
router.put(
  "/multioption",
  passport.authenticate("jwt", { session: false }),
  updateMultioption
);

// Delete Option
router.delete(
  "/multioption",
  passport.authenticate("jwt", { session: false }),
  deleteMultioption
);
module.exports = router;
