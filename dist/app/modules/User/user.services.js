"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const fileUploaders_1 = require("../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const createAdmin = async (req) => {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.admin.image = uploadToCloudinary?.secure_url;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const result = await prisma_1.default.$transaction(async (transactionClient) => {
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
const changePassword = async (id, payload) => {
    // console.log(password);
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userInfo = await prisma_1.default.user.update({
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
exports.userServices = {
    createAdmin,
    getAdmin,
    changePassword,
};
