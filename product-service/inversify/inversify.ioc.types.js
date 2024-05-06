"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOC = void 0;
var IOC = {
    ProductRepository: Symbol.for("ProductRepository"),
    ProductService: Symbol.for("ProductService"),
    ProductController: Symbol.for("ProductController")
};
exports.IOC = IOC;
