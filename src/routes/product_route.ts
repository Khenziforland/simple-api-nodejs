import express from "express";
import RouteGroup from "express-route-grouping";

const route = new RouteGroup("", express.Router())

import ProductController from "../controllers/product_controller"
const productController = new ProductController()

route.group("product", (router) => {
  // * Get Data
  router.get("/", productController.getData)

  // * Detail Data
  router.get("/:product_id", productController.detailData)

  // * Create Data
  router.post("/", productController.createData)

  // * Update Data
  router.put("/:product_id", productController.updateData)

  // * Delete Data
  router.delete("/:product_id", productController.deleteData)
})

export default route