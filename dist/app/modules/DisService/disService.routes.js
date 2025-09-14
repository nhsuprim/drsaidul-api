"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const client_1 = require("@prisma/client");
const fileUploaders_1 = require("../../helpers/fileUploaders");
const disService_controllers_1 = require("./disService.controllers");
const disService_validation_1 = require("./disService.validation");
const router = express_1.default.Router();
router.post("/", fileUploaders_1.fileUploader.upload.single("file"), (0, authMiddleware_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPERADMIN), (req, res, next) => {
    req.body = disService_validation_1.serviceValidation.addServiceSchema.parse(JSON.parse(req.body.data));
    return disService_controllers_1.serviceController.addService(req, res, next);
});
router.get("/", disService_controllers_1.serviceController.getService);
router.get("/:id", disService_controllers_1.serviceController.getServiceById);
router.delete("/:id", (0, authMiddleware_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPERADMIN), disService_controllers_1.serviceController.remove);
exports.serviceRoutes = router;
