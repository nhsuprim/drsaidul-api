import { fileUploader } from "../../helpers/fileUploaders";
import { IFile } from "../../interface/file";
import prisma from "../../shared/prisma";

const add = async (req: any) => {
    const file = req.file as IFile;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.image = uploadToCloudinary?.secure_url;
    }
    const result = await prisma.testimonial.create({
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
    const result = await prisma.testimonial.findMany({
        orderBy: { date: "desc" },
    });
    return result;
};

// get by id

const getById = async (id: string) => {
    const result = await prisma.testimonial.findUnique({
        where: { id },
    });
    return result;
};
// delete

const remove = async (id: string) => {
    await prisma.testimonial.delete({
        where: { id },
    });
};

export const testimonialService = {
    add,
    getAll,
    getById,
    remove,
};
