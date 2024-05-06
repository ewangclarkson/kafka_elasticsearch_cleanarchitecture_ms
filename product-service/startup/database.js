"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("mysql2/promise");
var config_1 = __importDefault(require("config"));
console.log(config_1.default.get("database.host"));
var poolConfig = {
    host: config_1.default.get("database.host"),
    user: config_1.default.get("database.user"),
    password: config_1.default.get("database.password"),
    database: config_1.default.get("database.name"),
    connectionLimit: 10
};
var pool = (0, promise_1.createPool)(poolConfig);
exports.default = pool;
