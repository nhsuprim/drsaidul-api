import { z } from "zod";

const createTestimonial = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    comment: z.string({
        required_error: "comment is required",
    }),
    serviceName: z.string({
        required_error: "ServiceName is required",
    }),
    rating: z.number({
        required_error: "Rating is required",
    }),
    address: z.string({
        required_error: "Address is required",
    }),
    date: z.string({
        required_error: "Date is required",
    }),
});

export const testimonialValidation = {
    createTestimonial,
};
