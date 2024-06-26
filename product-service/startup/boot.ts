import express, {Application} from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import productApis from "../routes/products.routes";
import {errorHandler} from "../middleware/error.handler";


export const startApplication = function (app: Application) {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use("/api/products", productApis);
    app.use(errorHandler);
};