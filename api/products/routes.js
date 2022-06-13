const express = require("express");
const router = express.Router();
const passport = require("passport");
const localupload = require("../../middleware/localupload");
const s3upload = require("../../middleware/s3upload");

// Controllers
const {
  addProduct,
  updateProduct,
  fetchProduct,
  deleteProduct,
  listProducts,
} = require("./controllers");

// Params middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product not found!");
    err.status = 401;
    next(err);
  }
});

// List All Products
router.get("/", listProducts);

// Add Product
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  s3upload,
  addProduct
);

// Update Product
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  s3upload,
  updateProduct
);

// Delete Product
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteProduct
);

module.exports = router;
