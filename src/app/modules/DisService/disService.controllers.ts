import { NextFunction, Request, Response } from "express";
import { categoryServices } from "./disService.service";

const addService = async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;

        // Call the inner addService function
        const result = await categoryServices.addService(req, user);

        res.status(201).json({
            success: true,
            message: "Service added successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};
const getService = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.getService();

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Service",
            error: error.name,
        });
    }
};

//getServiceById
const getServiceById = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.getServiceById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Service not found",
            error: error.name,
        });
    }
};

const remove = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.remove(req.params.id);

        res.status(200).json({
            success: true,
            message: "Service removed successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Service not found",
            error: error.name,
        });
    }
};

export const serviceController = {
    addService,
    getService,
    getServiceById,
    remove,
};
