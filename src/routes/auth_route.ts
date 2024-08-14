import express from "express";
import RouteGroup from "express-route-grouping";

const route = new RouteGroup("", express.Router())

import AuthController from "../controllers/auth_controller"
const authController = new AuthController()

route.group("auth", (router) => {
  // * Register
  router.post("/register", authController.register)

  // * Login
  router.post("/login", authController.login)

  // * Logout
  router.post("/logout", authController.logout)
})

export default route