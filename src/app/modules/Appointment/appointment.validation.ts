import { z } from "zod";

const questionSchema = z.object({
    question: z.string({
        required_error: "Question is required",
    }),
    answer: z.string({
        required_error: "Answer is required",
    }),
});

const appointmentSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    // email: z.string({
    //     required_error: "Email is required",
    // }),
    phone: z.string({
        required_error: "Phone is required",
    }),
    address: z.string({
        required_error: "Address is required",
    }),
    note: z.string({
        required_error: "Note is required",
    }),
    serviceId: z.string({
        required_error: "Service ID is required",
    }),
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"], {
        required_error: "Status is required",
    }),
    questions: z.array(questionSchema).optional(), // Include questions properly
});

export const appointmentValidation = {
    appointmentSchema,
};
