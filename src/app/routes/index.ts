import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { serviceRoutes } from "../modules/DisService/disService.routes";
import { appointmentRoutes } from "../modules/Appointment/appointment.route";
import { testimonialRoutes } from "../modules/Testimonial/testimonial.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/services",
        route: serviceRoutes,
    },
    {
        path: "/testimonial",
        route: testimonialRoutes,
    },
    {
        path: "/appointment",
        route: appointmentRoutes,
    },
    {
        path: "/admin",
        route: adminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
