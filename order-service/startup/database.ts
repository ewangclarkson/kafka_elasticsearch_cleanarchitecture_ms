import {DataSource} from "typeorm"
import {Cart} from "../domain/model/Cart";
import {Order} from "../domain/model/Order";
import config from "config"


//singleton design pattern
export default class DatabaseConfigManager {
    private readonly dataSourceConfig: DataSource;
    private static instance: DatabaseConfigManager;

    constructor() {
        this.dataSourceConfig = new DataSource({
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