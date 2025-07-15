import { Question } from "./../../../../node_modules/.prisma/client/index.d";
import prisma from "../../shared/prisma";
import { fileUploader } from "../../helpers/fileUploaders";
import { IFile } from "../../interface/file";

const addAppointment = async (req: any) => {
    const files = req.files as IFile[];

    const service = await prisma.service.findUniqueOrThrow({
        where: { id: req.body.serviceId },
    });
    // console.log(req.body);
    const imageUrls: string[] = [];

    if (files && files.length > 0) {
        for (const file of files) {
            const uploadToCloudinary = await fileUploader.uploadToCloudinary(
                file
            );
            if (uploadToCloudinary?.secure_url) {
                imageUrls.push(uploadToCloudinary.secure_url);
            }
        }
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const questionsData = req.body.questions.map((question: any) => ({
            question: question.question,
            answer: question.answer,
        }));
        const appointment = await prisma.appointment.create({
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
    const result = await prisma.appointment.findMany({
        include: {
            form: true,
            service: true,
        },
    });
    return result;
};

//get appointment by id

const getAppointmentById = async (id: string) => {
    const result = await prisma.appointment.findUnique({
        where: { id },
        include: {
            form: true,
            service: true,
        },
    });
    return result;
};

const update = async (id: string, payload: any) => {
    const appoinment = await prisma.appointment.findFirstOrThrow({
        where: {
            id: id,
        },
    });

    const result = await prisma.appointment.update({
        where: {
            id: appoinment.id,
        },
        data: payload,
    });
    return result;
};

export const appointmentService = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    update,
};
