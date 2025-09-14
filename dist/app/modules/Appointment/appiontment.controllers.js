"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentController = void 0;
const appointment_services_1 = require("./appointment.services");
const addAppointment = async (req, res, next) => {
    try {
        const result = await appointment_services_1.appointmentService.addAppointment(req);
        res.status(201).json({
            success: true,
            message: "Appointment added successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// update
const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await appointment_services_1.appointmentService.update(id, req.body);
        res.status(201).json({
            success: true,
            message: "Appointment updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//get all appointment
const getAllAppointments = async (req, res, next) => {
    try {
        const result = await appointment_services_1.appointmentService.getAllAppointments();
        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//get appointment by id
const getAppointmentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await appointment_services_1.appointmentService.getAppointmentById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Appointment retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.appointmentController = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    update
};
