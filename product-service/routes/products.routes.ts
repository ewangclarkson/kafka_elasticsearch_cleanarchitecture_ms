import express, {Router} from "express";
import {container} from "../ioc/inversify.inversify.config";
import ProductController from "../controller/ProductController";
import {IOC} from "../ioc/inversify.inversify.types";

const router = express.Router();

const controller = container.get<ProductController>(IOC.ProductController);

router.post("/", controller.createProduct.bind(controller));
router.put("/:id", controller.updateProduct.bind(controller));
router.get("/", controller.getProducts.bind(controller));
router.get("/:id", controller.getProduct.bind(controller));
router.delete("/:id", controller.deleteProduct.bind(controller));

export default router;