import express from "express";
import RouteGroup from "express-route-grouping";

const route = new RouteGroup("", express.Router())

import ProductCategoryController from "../controllers/product_category_controller"
const productCategoryController = new ProductCategoryController()

route.group("product-category", (router) => {
  // * Get Data
  router.get("/", productCategoryController.getData)

  // * Detail Data
  router.get("/:product_category_id", productCategoryController.detailData)

  // * Create Data
  router.post("/", productCategoryController.createData)

  // * Update Data
  router.put("/:product_category_id", productCategoryController.updateData)

  // * Delete Data
  router.delete("/:product_category_id", productCategoryController.deleteData)
})

export default route