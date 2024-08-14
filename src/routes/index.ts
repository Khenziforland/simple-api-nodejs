import express from "express";

const router = express.Router();

//* Auth
import authRoute from "./auth_route";
router.use("", authRoute.export());

//* Product Category
import productCategoryRoute from "./product_category_route";
router.use("", productCategoryRoute.export());

//* Product
import productRoute from "./product_route";
router.use("", productRoute.export());

export default router;
