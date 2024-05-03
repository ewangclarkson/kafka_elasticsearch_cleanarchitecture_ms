import {DataSource} from "typeorm"
import {Cart} from "../domain/model/Cart";
import {Order} from "../domain/model/Order";
import config from "config"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.get("database.host"),
    port: config.get("database.port"),
    username: config.get("database.username"),
    password: config.get("database.password"),
    database: config.get("database.name"),
    synchronize: true,
    logging: false,
    entities: [Cart, Order],
    migrations: [],
    subscribers: [],
});
