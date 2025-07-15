import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.services";
import httpStatus from "http-status";

const createSuperAdmin = async (req: Request, res: Response) => {
    try {
        const result = await adminService.createSuperAdmin(req.body);
        res.status(200).json({
            success: true,
            message: "Super admin created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const adminController = {
    createSuperAdmin,
};
