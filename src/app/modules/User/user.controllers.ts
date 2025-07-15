import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userServices.createAdmin(req);
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: result,
        });
    } catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userServices.getAdmin();
        res.status(200).json({
            success: true,
            message: "Admin retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};

const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const result = await userServices.changePassword(id, req.body);
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            data: result,
        });
    } catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: "Password changed failed",
        // });
    }
};

export const userControllers = {
    createAdmin,
    getAdmin,
    changePassword,
};
