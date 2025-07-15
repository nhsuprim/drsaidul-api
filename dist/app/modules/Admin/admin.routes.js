"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("./admin.controllers");
const router = express_1.default.Router();
router.post("/super-admin", admin_controllers_1.adminController.createSuperAdmin);
exports.adminRoutes = router;
