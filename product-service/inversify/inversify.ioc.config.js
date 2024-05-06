"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var inversify_ioc_types_1 = require("./inversify.ioc.types");
var ProductRepository_1 = __importDefault(require("../repository/implementation/ProductRepository"));
var ProductServiceImpl_1 = __importDefault(require("../domain/service/ProductServiceImpl"));
var ProductController_1 = __importDefault(require("../controller/ProductController"));
var container = new inversify_1.Container();
exports.container = container;
container.bind(inversify_ioc_types_1.IOC.ProductRepository).to(ProductRepository_1.default);
container.bind(inversify_ioc_types_1.IOC.ProductService).to(ProductServiceImpl_1.default);
container.bind(inversify_ioc_types_1.IOC.ProductController).to(ProductController_1.default);
