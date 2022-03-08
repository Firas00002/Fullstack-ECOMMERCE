const express = require("express");
const {
  getAllProducts,
  addProducts,
  editProducts,
  removeProducts,
  ProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productsController");
const { createproductsRules, validator } = require("../middlewares/validator");

const verifyproduct = require("../middlewares/verifyproduct");
const verifyAuth = require("../middlewares/verifyAuth");
const roleCheck = require("../middlewares/verifyRoles");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", verifyproduct, ProductDetails);

router.get("/admin/products", verifyAuth, roleCheck("admin"), getAdminProducts);
router.post(
  "/admin/products/add",
  createproductsRules(),
  verifyAuth,
  roleCheck("admin"),
  validator,
  addProducts
);
router.put(
  "/admin/products/:id",
  verifyproduct,
  verifyAuth,
  roleCheck("admin"),
  editProducts
);
router.delete(
  "/admin/products/:id",
  verifyproduct,
  verifyAuth,
  roleCheck("admin"),
  removeProducts
);
router.put("/review", verifyAuth, createProductReview);
router.get("/reviews", getProductReviews);
router.delete("/reviews", verifyAuth, deleteReview);

module.exports = router;
