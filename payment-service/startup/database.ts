import {DataSource} from "typeorm"
import {Payment} from "../domain/model/Payment";
import config from "config"

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: config.get("database.host"),
    port: config.get("database.port"),
    username: config.get("database.username"),
    password: config.get("database.password"),
    database: config.get("database.name"),
    authSource: 'admin',
    synchronize: true,
    logging: false,
    entities: [Payment],
    migrations: [],
    subscribers: [],
});
