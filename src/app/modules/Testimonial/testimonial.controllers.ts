import { NextFunction, Request, Response } from "express";
import { testimonialService } from "./testimonial.service";

const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await testimonialService.add(req);
        res.status(201).json({
            success: true,
            message: "Testimonial added successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};
//get all

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await testimonialService.getAll();
        res.status(200).json({
            success: true,
            message: "Testimonials retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};
// get by id

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await testimonialService.getById(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Testimonial retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};
// delete

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await testimonialService.remove(req.params.id);

        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};

export const testimonialControllers = {
    add,
    getAll,
    getById,
    remove,
};
