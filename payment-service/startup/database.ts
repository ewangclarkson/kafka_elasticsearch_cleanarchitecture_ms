import {DataSource} from "typeorm"
import {Payment} from "../domain/model/Payment";


//singleton design pattern
export default class DatabaseConfigManager {
    private readonly dataSourceConfig: DataSource;
    private static instance: DatabaseConfigManager;

    constructor() {
        this.dataSourceConfig = new DataSource({
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
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseConfigManager();
        }
        return this.instance;
    }

    getDataSourceConfig() {
        return this.dataSourceConfig;
    }

}
