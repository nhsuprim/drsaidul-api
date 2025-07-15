import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandle";

const app: Application = express();
app.use(cors());
app.use(cookieParser());
dotenv.config();

//parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send({
        Message: "Mirhazirbag Premier League server..",
    });
});

app.use(globalErrorHandler);

app.use("/api/v1", router);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});

export default app;
