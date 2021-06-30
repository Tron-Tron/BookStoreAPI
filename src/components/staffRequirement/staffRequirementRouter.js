import express from "express";
import jwtAuth from "../../middleware/jwtAuth.js";
import {
  getAllRequirementByUserRole,
  acceptRoleStaff,
  rejectRoleStaff,
} from "./staffRequirementController.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();
router.use(jwtAuth, authorize("admin", "manager"));
router.get("/", getAllRequirementByUserRole);
router.post("/accept/:id", acceptRoleStaff);
router.delete("/reject/:id", rejectRoleStaff);

export default router;
