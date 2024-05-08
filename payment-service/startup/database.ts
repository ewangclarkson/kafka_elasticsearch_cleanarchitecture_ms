import {DataSource} from "typeorm"
import {Payment} from "../domain/model/Payment";
import config from "config";

export const AppDataSource = new DataSource({
    type: "mongodb",
    // host: config.get("database.host"),
    // port: config.get("database.port"),
    // username: config.get("database.username"),
    // password: config.get("database.password"),
    // database: config.get("database.name"),
    url: "mongodb+srv://ewangclarks:Jesusislordforever@cluster0.4lec3.mongodb.net/payments",
    synchronize: true,
    logging: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    entities: [Payment],
    migrations: [],
    subscribers: [],
});
