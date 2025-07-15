import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controllers";
import auth from "../../middleware/authMiddleware";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post("/super-admin", adminController.createSuperAdmin);

export const adminRoutes = router;
