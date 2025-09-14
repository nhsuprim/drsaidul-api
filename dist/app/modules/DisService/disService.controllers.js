"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = void 0;
const disService_service_1 = require("./disService.service");
const addService = async (req, res, next) => {
    try {
        const user = req.user;
        // Call the inner addService function
        const result = await disService_service_1.categoryServices.addService(req, user);
        res.status(201).json({
            success: true,
            message: "Service added successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getService = async (req, res) => {
    try {
        const result = await disService_service_1.categoryServices.getService();
        res.status(200).json({
            success: true,
            message: "Service retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Service",
            error: error.name,
        });
    }
};
//getServiceById
const getServiceById = async (req, res) => {
    try {
        const result = await disService_service_1.categoryServices.getServiceById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Service retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Service not found",
            error: error.name,
        });
    }
};
const remove = async (req, res) => {
    try {
        const result = await disService_service_1.categoryServices.remove(req.params.id);
        res.status(200).json({
            success: true,
            message: "Service removed successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Service not found",
            error: error.name,
        });
    }
};
exports.serviceController = {
    addService,
    getService,
    getServiceById,
    remove,
};
