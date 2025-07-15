import { Secret } from "jsonwebtoken";
import prisma from "../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

const createSuperAdmin = async (payload: any) => {
    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const userData = {
        email: payload.email,
        password: hashedPassword,
        role: UserRole.SUPERADMIN,
    };

    const secretKey = "MPL_SECRET_KEY_FOR_SUPRER_ADMIN";

    if (payload.secretKey === secretKey) {
        const result = await prisma.$transaction(async (transactionClient) => {
            const user = await transactionClient.user.create({
                data: userData,
            });

            const createdAdminData = await transactionClient.admin.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    contactNumber: payload.contactNumber,
                    user: { connect: { id: user.id } },
                },
            });

            return createdAdminData;
        });

        return result;
    }
};

export const adminService = {
    createSuperAdmin,
};
