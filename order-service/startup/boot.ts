import express, {Application} from "express";
import cors from "cors";
import compression from "compression";
//import helmet from "helmet";
import ordersApis from "../routes/orders.routes";
import cartApis from "../routes/cart.routes"


export const startApplication = function (app: Application) {
    app.use(express.json());
    /// app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use("/api/orders", ordersApis);
    app.use("/api/carts", cartApis);
};