import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploaders";
import { appointmentValidation } from "./appointment.validation";
import { appointmentController } from "./appiontment.controllers";
import auth from "../../middleware/authMiddleware";

const router = express.Router();

router.post(
    "/create-appointment",
    // auth("ADMIN", "SUPERADMIN"),
    fileUploader.upload.array("files", 3), // Allow up to 3 files, adjust the number as needed
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = appointmentValidation.appointmentSchema.parse(
                JSON.parse(req.body.data)
            );
            return appointmentController.addAppointment(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/",
    auth("ADMIN", "SUPERADMIN"),
    appointmentController.getAllAppointments
);

router.get(
    "/:id",
    auth("ADMIN", "SUPERADMIN"),
    appointmentController.getAppointmentById
);
router.patch("/:id", auth("ADMIN", "SUPERADMIN"), appointmentController.update);

export const appointmentRoutes = router;
