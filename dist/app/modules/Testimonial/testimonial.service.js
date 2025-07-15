"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialService = void 0;
const fileUploaders_1 = require("../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const add = async (req) => {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.image = uploadToCloudinary?.secure_url;
    }
    const result = await prisma_1.default.testimonial.create({
        data: {
            name: req.body.name,
            serviceName: req.body.serviceName,
            image: req.body.image,
            address: req.body.address,
            rating: req.body.rating,
            comment: req.body.comment,
            date: req.body.date,
        },
    });
    return result;
};
// get all
const getAll = async () => {
    const result = await prisma_1.default.testimonial.findMany({
        orderBy: { date: "desc" },
    });
    return result;
};
// get by id
const getById = async (id) => {
    const result = await prisma_1.default.testimonial.findUnique({
        where: { id },
    });
    return result;
};
// delete
const remove = async (id) => {
    await prisma_1.default.testimonial.delete({
        where: { id },
    });
};
exports.testimonialService = {
    add,
    getAll,
    getById,
    remove,
};
