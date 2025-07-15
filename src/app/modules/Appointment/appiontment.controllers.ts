import { NextFunction, Request, Response } from "express";
import { appointmentService } from "./appointment.services";

const addAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await appointmentService.addAppointment(req);
        res.status(201).json({
            success: true,
            message: "Appointment added successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};
// update
const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await appointmentService.update(id, req.body);
        res.status(201).json({
            success: true,
            message: "Appointment updated successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};
//get all appointment

const getAllAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await appointmentService.getAllAppointments();
        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};

//get appointment by id

const getAppointmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const result = await appointmentService.getAppointmentById(id);
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
    } catch (error: any) {
        next(error);
    }
};
export const appointmentController = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    update
};
