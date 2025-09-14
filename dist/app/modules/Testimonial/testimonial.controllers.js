"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialControllers = void 0;
const testimonial_service_1 = require("./testimonial.service");
const add = async (req, res, next) => {
    try {
        const result = await testimonial_service_1.testimonialService.add(req);
        res.status(201).json({
            success: true,
            message: "Testimonial added successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//get all
const getAll = async (req, res, next) => {
    try {
        const result = await testimonial_service_1.testimonialService.getAll();
        res.status(200).json({
            success: true,
            message: "Testimonials retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// get by id
const getById = async (req, res, next) => {
    try {
        const result = await testimonial_service_1.testimonialService.getById(req.params.id);
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
    }
    catch (error) {
        next(error);
    }
};
// delete
const remove = async (req, res, next) => {
    try {
        const result = await testimonial_service_1.testimonialService.remove(req.params.id);
        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.testimonialControllers = {
    add,
    getAll,
    getById,
    remove,
};
