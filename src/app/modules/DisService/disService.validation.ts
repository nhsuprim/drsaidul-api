import { z } from "zod";

const optionSchema = z.array(z.string()); // Ensures options are always an array of strings

const questionSchema = z.object({
    question: z.string({
        required_error: "Question is required",
    }),
    answerType: z.enum(["TEXT", "DROPDOWN", "CHECKBOX"], {
        required_error: "Answer type is required",
    }),
    options: optionSchema.optional(), // Options are only required for CHECKBOX and DROPDOWN
});

const addServiceSchema = z.object({
    name: z.string({
        required_error: "Service name is required",
    }),
    description: z.string({
        required_error: "Service description is required",
    }),
    image: z.string().url().optional(), // Ensures a valid URL for the image
    questions: z.array(questionSchema, {
        required_error: "At least one question is required",
    }),
});

export const serviceValidation = {
    addServiceSchema,
};
