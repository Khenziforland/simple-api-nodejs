import express from "express";
import RouteGroup from "express-route-grouping";
import { authMiddleware } from "../middlewares/auth_middleware";


const route = new RouteGroup("", express.Router())

import ProductCategoryController from "../controllers/product_category_controller"
const productCategoryController = new ProductCategoryController()

route.group("master-data/product-category", (router) => {
  // * Get Data
  router.get("/", authMiddleware, productCategoryController.getData)

  // * Detail Data
  router.get("/:product_category_id", authMiddleware, productCategoryController.detailData)

  // * Create Data
  router.post("/", authMiddleware, productCategoryController.createData)

  // * Update Data
  router.put("/:product_category_id", authMiddleware, productCategoryController.updateData)

  // * Delete Data
  router.delete("/:product_category_id", authMiddleware, productCategoryController.deleteData)
})

export default route