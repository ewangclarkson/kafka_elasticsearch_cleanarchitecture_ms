import {createPool, Pool, PoolOptions} from 'mysql2/promise';
import config from "config";

console.log(config.get("database.host"));
const poolConfig: PoolOptions = {
    host: config.get("database.host"),
    user: config.get("database.user"),
    password: config.get("database.password"),
    database: config.get("database.name"),
    connectionLimit: 10
};

const pool: Pool = createPool(poolConfig);

export default pool;