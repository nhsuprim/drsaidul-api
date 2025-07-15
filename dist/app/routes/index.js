"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const disService_routes_1 = require("../modules/DisService/disService.routes");
const appointment_route_1 = require("../modules/Appointment/appointment.route");
const testimonial_routes_1 = require("../modules/Testimonial/testimonial.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/services",
        route: disService_routes_1.serviceRoutes,
    },
    {
        path: "/testimonial",
        route: testimonial_routes_1.testimonialRoutes,
    },
    {
        path: "/appointment",
        route: appointment_route_1.appointmentRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.adminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
