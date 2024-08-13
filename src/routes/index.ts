import express from "express";

const router = express.Router();

import authRoute from "./auth_route";
router.use("", authRoute.export());

export default router;
