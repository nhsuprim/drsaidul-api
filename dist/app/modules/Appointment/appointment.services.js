"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const fileUploaders_1 = require("../../helpers/fileUploaders");
const addAppointment = async (req) => {
    const files = req.files;
    const service = await prisma_1.default.service.findUniqueOrThrow({
        where: { id: req.body.serviceId },
    });
    // console.log(req.body);
    const imageUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const uploadToCloudinary = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
            if (uploadToCloudinary?.secure_url) {
                imageUrls.push(uploadToCloudinary.secure_url);
            }
        }
    }
    const result = await prisma_1.default.$transaction(async (transactionClient) => {
        const questionsData = req.body.questions.map((question) => ({
            question: question.question,
            answer: question.answer,
        }));
        const appointment = await prisma_1.default.appointment.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                note: req.body.note,
                image: imageUrls,
                status: req.body.status,
                form: {
                    create: questionsData,
                },
                service: { connect: { id: req.body.serviceId } },
            },
            include: {
                form: true,
            },
        });
        return appointment;
    });
    return result;
};
//get all appointment
const getAllAppointments = async () => {
    const result = await prisma_1.default.appointment.findMany({
        include: {
            form: true,
            service: true,
        },
    });
    return result;
};
//get appointment by id
const getAppointmentById = async (id) => {
    const result = await prisma_1.default.appointment.findUnique({
        where: { id },
        include: {
            form: true,
            service: true,
        },
    });
    return result;
};
const update = async (id, payload) => {
    const appoinment = await prisma_1.default.appointment.findFirstOrThrow({
        where: {
            id: id,
        },
    });
    const result = await prisma_1.default.appointment.update({
        where: {
            id: appoinment.id,
        },
        data: payload,
    });
    return result;
};
exports.appointmentService = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    update,
};
