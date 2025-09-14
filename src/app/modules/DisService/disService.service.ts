import { Request } from "express";
import prisma from "../../shared/prisma";
import { IFile } from "../../interface/file";
import { fileUploader } from "../../helpers/fileUploaders";
import ApiError from "../../erros/ApiError";

const addService = async (req: Request, user: any) => {
    const file = req.file as IFile;

    let imageUrl: string | undefined = undefined;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        imageUrl = uploadToCloudinary?.secure_url;
    }

    const questionsData = req.body.questions.map(
        (question: any, index: number) => ({
            question: question.question,
            answerType: question.answerType,
            order: index + 1,
            option: {
                create: question.options?.map((option: any) => ({
                    label: option,
                })),
            },
        })
    );

    // 🔥 Transaction starts AFTER all async work is done
    const result = await prisma.$transaction(async (transactionClient) => {
        const serviceData = await transactionClient.service.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount,
                amountMonthly: req.body.amountMonthly,
                image: imageUrl, // 🟢 Use pre-uploaded image URL
                questions: {
                    create: questionsData, // 🟢 Use pre-processed questions
                },
            },
            include: {
                questions: {
                    include: {
                        option: true,
                    },
                },
            },
        });

        return serviceData;
    });

    return result;
};
const getService = async () => {
    const services = await prisma.service.findMany({
        include: {
            questions: {
                include: {
                    option: true,
                },
            },
        },
    });
    return services;
};

const getServiceById = async (id: string) => {
    const service = await prisma.service.findUnique({
        where: { id },
        include: {
            questions: {
                include: {
                    option: true,
                },
                orderBy: {
                    order: "asc", // 👈 ensures serial order
                },
            },
        },
    });
    return service;
};

const remove = async (id: string) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Find all question IDs for the service
            const questions = await tx.question.findMany({
                where: { serviceId: id },
                select: { id: true },
            });
            const questionIds = questions.map((q) => q.id);

            // 2. Delete all answers linked to those questions
            await tx.answer.deleteMany({
                where: { questionId: { in: questionIds } },
            });

            // 3. Delete all options linked to those questions
            await tx.option.deleteMany({
                where: { questionId: { in: questionIds } },
            });

            // 4. Delete the questions
            await tx.question.deleteMany({
                where: { id: { in: questionIds } },
            });

            // 5. Delete the service
            const serviceDeleted = await tx.service.delete({
                where: { id },
            });

            return serviceDeleted;
        });

        return result;
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};

export const categoryServices = {
    addService,
    getService,
    getServiceById,
    remove,
};
