"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_services_1 = require("./admin.services");
const createSuperAdmin = async (req, res) => {
    try {
        const result = await admin_services_1.adminService.createSuperAdmin(req.body);
        res.status(200).json({
            success: true,
            message: "Super admin created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.adminController = {
    createSuperAdmin,
};
