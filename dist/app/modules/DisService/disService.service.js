"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const fileUploaders_1 = require("../../helpers/fileUploaders");
const addService = async (req, user) => {
    const file = req.file;
    let imageUrl = undefined;
    if (file) {
        const uploadToCloudinary = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
        imageUrl = uploadToCloudinary?.secure_url;
    }
    const questionsData = req.body.questions.map((question) => ({
        question: question.question,
        answerType: question.answerType,
        option: {
            create: question.options?.map((option) => ({
                label: option,
            })),
        },
    }));
    // 🔥 Transaction starts AFTER all async work is done
    const result = await prisma_1.default.$transaction(async (transactionClient) => {
        const serviceData = await transactionClient.service.create({
            data: {
                name: req.body.name,
                description: req.body.description,
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
    const services = await prisma_1.default.service.findMany({
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
const getServiceById = async (id) => {
    const service = await prisma_1.default.service.findUnique({
        where: { id },
        include: {
            questions: {
                include: {
                    option: true,
                },
            },
        },
    });
    return service;
};
const remove = async (id) => {
    try {
        const result = await prisma_1.default.$transaction(async (tx) => {
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
    }
    catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};
exports.categoryServices = {
    addService,
    getService,
    getServiceById,
    remove,
};
