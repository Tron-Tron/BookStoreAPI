import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import {
  getProfile,
  updateProfile,
  registerToBeStaff,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./usersController.js";
import validateMiddleware from "./../commons/validateMiddleware.js";
import UserValidate from "./userValidate.js";
import authorize from "./../../middleware/authorize.js";

const router = express.Router();
router.get("/", jwtAuth, getProfile);
router.patch("/", jwtAuth, updateProfile);
router.post(
  "/register-to-staff",
  jwtAuth,
  authorize("customer"),
  registerToBeStaff
);
router.get("/all", jwtAuth, authorize("admin"), getAllUsers);
export default router;
