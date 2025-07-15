"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const optionSchema = zod_1.z.array(zod_1.z.string()); // Ensures options are always an array of strings
const questionSchema = zod_1.z.object({
    question: zod_1.z.string({
        required_error: "Question is required",
    }),
    answerType: zod_1.z.enum(["TEXT", "DROPDOWN", "CHECKBOX"], {
        required_error: "Answer type is required",
    }),
    options: optionSchema.optional(), // Options are only required for CHECKBOX and DROPDOWN
});
const addServiceSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Service name is required",
    }),
    description: zod_1.z.string({
        required_error: "Service description is required",
    }),
    image: zod_1.z.string().url().optional(), // Ensures a valid URL for the image
    questions: zod_1.z.array(questionSchema, {
        required_error: "At least one question is required",
    }),
});
exports.serviceValidation = {
    addServiceSchema,
};
