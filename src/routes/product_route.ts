import express from "express";
import RouteGroup from "express-route-grouping";
import { authMiddleware } from "../middlewares/auth_middleware";

const route = new RouteGroup("", express.Router())

import ProductController from "../controllers/product_controller"
const productController = new ProductController()

route.group("master-data/product", (router) => {
  // * Get Data
  router.get("/", authMiddleware, productController.getData)

  // * Detail Data
  router.get("/:product_id", authMiddleware, productController.detailData)

  // * Create Data
  router.post("/", authMiddleware, productController.createData)

  // * Update Data
  router.put("/:product_id", authMiddleware, productController.updateData)

  // * Delete Data
  router.delete("/:product_id", authMiddleware, productController.deleteData)
})

export default route