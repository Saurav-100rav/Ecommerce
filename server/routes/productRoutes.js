const express = require("express");
const router = express.Router();

const {createProduct,getAllProducts, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productControllers");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

router.route("/product/new").post(isAuthenticatedUser, createProduct)
router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"), getAllProducts);
router.route("/product/:id").get( isAuthenticatedUser, getProductDetails);
router.route("/product/:id").put( isAuthenticatedUser,updateProduct);
router.route("/product/:id").delete(deleteProduct);

module.exports = router;