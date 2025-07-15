import express, { NextFunction, Request, Response } from "express";
import auth from "../../middleware/authMiddleware";
import { UserRole } from "@prisma/client";

import { fileUploader } from "../../helpers/fileUploaders";
import { serviceController } from "./disService.controllers";
import { serviceValidation } from "./disService.validation";

const router = express.Router();

router.post(
    "/",
    fileUploader.upload.single("file"),
    auth(UserRole.ADMIN, UserRole.SUPERADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = serviceValidation.addServiceSchema.parse(
            JSON.parse(req.body.data)
        );

        return serviceController.addService(req, res, next);
    }
);
router.get("/", serviceController.getService);
router.get("/:id", serviceController.getServiceById);
router.delete(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPERADMIN),
    serviceController.remove
);

export const serviceRoutes = router;
