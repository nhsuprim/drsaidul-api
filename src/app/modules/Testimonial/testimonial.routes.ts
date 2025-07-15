import express, { NextFunction, Request, Response } from "express";

import { fileUploader } from "../../helpers/fileUploaders";

import auth from "../../middleware/authMiddleware";
import { testimonialValidation } from "./testimonial.validation";
import { testimonialControllers } from "./testimonial.controllers";

const router = express.Router();

router.post(
    "/",
    auth("ADMIN", "SUPERADMIN"),
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = testimonialValidation.createTestimonial.parse(
            JSON.parse(req.body.data)
        );

        return testimonialControllers.add(req, res, next);
    }
);

router.get("/", testimonialControllers.getAll);

router.get("/:id", testimonialControllers.getById);

router.delete(
    "/:id",
    auth("ADMIN", "SUPERADMIN"),
    testimonialControllers.remove
);

export const testimonialRoutes = router;
