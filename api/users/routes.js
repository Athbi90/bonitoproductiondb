const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  signup,
  signin,
  fetchUser,
  listUsers,
  topSelling,
  lowStock,
  mainStats,
  newOrders,
  allcategories,
  getAllProducts,
} = require("./controllers");

// Params middleware
router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("User not found!");
    err.status = 401;
    next(err);
  }
});

// Sign up
router.post("/signup", signup);

// Sign in
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.get("/", passport.authenticate("jwt", { session: false }), listUsers);

router.get(
  "/topselling",
  passport.authenticate("jwt", { session: false }),
  topSelling
);

router.get(
  "/lowStock",
  passport.authenticate("jwt", { session: false }),
  lowStock
);

router.get(
  "/stats",
  passport.authenticate("jwt", { session: false }),
  mainStats
);

router.get(
  "/neworders",
  passport.authenticate("jwt", { session: false }),
  newOrders
);

router.get(
  "/allcategories",
  passport.authenticate("jwt", { session: false }),
  allcategories
);

router.get(
  "/allproducts",
  passport.authenticate("jwt", { session: false }),
  getAllProducts
);

module.exports = router;
