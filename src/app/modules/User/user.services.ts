import { Admin, UserRole } from "@prisma/client";
import { fileUploader } from "../../helpers/fileUploaders";
import { IFile } from "../../interface/file";
import prisma from "../../shared/prisma";
import { Request } from "express";
import * as bcrypt from "bcrypt";
import ApiError from "../../erros/ApiError";

const createAdmin = async (req: Request): Promise<Admin> => {
    const file = req.file as IFile;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.image = uploadToCloudinary?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({
            data: userData,
        });

        const createdAdminData = await transactionClient.admin.create({
            data: {
                name: req.body.admin.name,
                email: req.body.admin.email,
                image: req.body.admin.image,
                contactNumber: req.body.admin.contactNumber,
                user: { connect: { id: user.id } },
            },
        });

        return createdAdminData;
    });

    return result;
};

const changePassword = async (id: string, payload: any) => {
    // console.log(password);
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userInfo = await prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword,
        },
    });
    return userInfo;
};

const getAdmin = async () => {
    return "admin";
};

export const userServices = {
    createAdmin,
    getAdmin,
    changePassword,
};
