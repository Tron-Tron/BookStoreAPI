import express from "express";

import { register, login } from "./authController.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import userValidate from "./../users/userValidate.js";
const router = express.Router();

router.post(
  "/register",
  validateMiddleware(userValidate.postUser, "body"),
  register
);
router.post(
  "/login",
  validateMiddleware(userValidate.loginUser, "body"),
  login
);
export default router;
