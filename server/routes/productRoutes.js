const express = require("express");
const router = express.Router();

const {createProduct,getAllProducts, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productControllers");

router.route("/product/new").post(createProduct)
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);

module.exports = router;