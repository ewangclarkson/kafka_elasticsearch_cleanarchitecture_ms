import express, {Application} from "express";
import "reflect-metadata";
import {startApplication} from "./startup/boot";
import config from "config"
import DatabaseConfigManager from "./startup/database";
import KafkaService from "./service/KafkaService";
import {KafkaTopics} from "./config/constants/kafka.topics";
import {container} from "./inversify/inversify.ioc.config";
import {IOC} from "./inversify/inversify.ioc.types";

const app: Application = express();
const kafkaService: KafkaService = container.get<KafkaService>(IOC.KafkaService);

const startServer = function () {

    DatabaseConfigManager
        .getInstance()
        .getDataSource()
        .initialize()
        .then(() => console.log("database configured successfully"))
        .catch(error => console.log(error));

    startApplication(app);

    kafkaService.kafkaObserver(KafkaTopics.ORDER_TOPIC)
        .then(() => console.log("consume success"))
        .catch((err) => console.log(err));

    const port: number = Number(process.env.PORT) || config.get("app.port");

    return app.listen(port, () => console.log(`The application ${config.get("app.name")} started on port ${port}`));
};

export const server = startServer();


