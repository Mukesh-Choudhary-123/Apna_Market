const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  UpdateProduct,
} = require("../controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", UpdateProduct);

exports.router = router;
