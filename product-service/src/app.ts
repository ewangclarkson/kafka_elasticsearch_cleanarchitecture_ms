import express, {Application} from "express";
import "reflect-metadata";
import {startApplication} from "./startup/boot";
import config from "config"

const app: Application = express();


const startServer = function () {

    startApplication(app);

    const port: number = Number(process.env.PORT) || config.get("app.port");

    return app.listen(port, () => console.log(`The application ${config.get("app.name")} started on port ${port}`));
};

export const server = startServer();


