"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidation = void 0;
const zod_1 = require("zod");
const questionSchema = zod_1.z.object({
    question: zod_1.z.string({
        required_error: "Question is required",
    }),
    answer: zod_1.z.string({
        required_error: "Answer is required",
    }),
});
const appointmentSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    // email: z.string({
    //     required_error: "Email is required",
    // }),
    phone: zod_1.z.string({
        required_error: "Phone is required",
    }),
    address: zod_1.z.string({
        required_error: "Address is required",
    }),
    note: zod_1.z.string({
        required_error: "Note is required",
    }),
    serviceId: zod_1.z.string({
        required_error: "Service ID is required",
    }),
    status: zod_1.z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"], {
        required_error: "Status is required",
    }),
    questions: zod_1.z.array(questionSchema).optional(), // Include questions properly
});
exports.appointmentValidation = {
    appointmentSchema,
};
