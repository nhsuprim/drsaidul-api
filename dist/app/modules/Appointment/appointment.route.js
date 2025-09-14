"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploaders_1 = require("../../helpers/fileUploaders");
const appointment_validation_1 = require("./appointment.validation");
const appiontment_controllers_1 = require("./appiontment.controllers");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/create-appointment", 
// auth("ADMIN", "SUPERADMIN"),
fileUploaders_1.fileUploader.upload.array("files", 3), // Allow up to 3 files, adjust the number as needed
(req, res, next) => {
    try {
        req.body = appointment_validation_1.appointmentValidation.appointmentSchema.parse(JSON.parse(req.body.data));
        return appiontment_controllers_1.appointmentController.addAppointment(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.get("/", (0, authMiddleware_1.default)("ADMIN", "SUPERADMIN"), appiontment_controllers_1.appointmentController.getAllAppointments);
router.get("/:id", (0, authMiddleware_1.default)("ADMIN", "SUPERADMIN"), appiontment_controllers_1.appointmentController.getAppointmentById);
router.patch("/:id", (0, authMiddleware_1.default)("ADMIN", "SUPERADMIN"), appiontment_controllers_1.appointmentController.update);
exports.appointmentRoutes = router;
