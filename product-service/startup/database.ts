import {createPool, Pool, PoolOptions} from 'mysql2/promise';
import config from "config";


export default class DatabaseConfigManager {
    private readonly dataSourceConfig: Pool;
    private static instance: DatabaseConfigManager;

    constructor() {
        const poolConfig: PoolOptions = {
            host: config.get("database.host"),
            user: config.get("database.user"),
            password: config.get("database.password"),
            database: config.get("database.name"),
            connectionLimit: 10
        };

        this.dataSourceConfig = createPool(poolConfig);
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

