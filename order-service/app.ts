import express, {Application} from "express";
import "reflect-metadata";
import {startApplication} from "./startup/boot";
import config from "config"
import {AppDataSource} from "./startup/database";
import {KAFKAObserver} from "./domain/service/kafka.broker";
import {KafkaTopics} from "./config/constants/kafka.topics";

const app: Application = express();


const startServer = function () {

    AppDataSource.initialize()
        .then(() => console.log("database configured successfully"))
        .catch(error => console.log(error));

    startApplication(app);

    KAFKAObserver(KafkaTopics.ORDER_TOPIC)
        .then(() => console.log("consume success"))
        .catch((err) => console.log(err));

    const port: number = Number(process.env.PORT) || config.get("app.port");

    return app.listen(port, () => console.log(`The application ${config.get("app.name")} started on port ${port}`));
};

export const server = startServer();


