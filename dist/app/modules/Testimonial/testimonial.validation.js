"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialValidation = void 0;
const zod_1 = require("zod");
const createTestimonial = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    comment: zod_1.z.string({
        required_error: "comment is required",
    }),
    serviceName: zod_1.z.string({
        required_error: "ServiceName is required",
    }),
    rating: zod_1.z.number({
        required_error: "Rating is required",
    }),
    address: zod_1.z.string({
        required_error: "Address is required",
    }),
    date: zod_1.z.string({
        required_error: "Date is required",
    }),
});
exports.testimonialValidation = {
    createTestimonial,
};
