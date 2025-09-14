"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploaders_1 = require("../../helpers/fileUploaders");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const testimonial_validation_1 = require("./testimonial.validation");
const testimonial_controllers_1 = require("./testimonial.controllers");
const router = express_1.default.Router();
router.post("/", (0, authMiddleware_1.default)("ADMIN", "SUPERADMIN"), fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = testimonial_validation_1.testimonialValidation.createTestimonial.parse(JSON.parse(req.body.data));
    return testimonial_controllers_1.testimonialControllers.add(req, res, next);
});
router.get("/", testimonial_controllers_1.testimonialControllers.getAll);
router.get("/:id", testimonial_controllers_1.testimonialControllers.getById);
router.delete("/:id", (0, authMiddleware_1.default)("ADMIN", "SUPERADMIN"), testimonial_controllers_1.testimonialControllers.remove);
exports.testimonialRoutes = router;
