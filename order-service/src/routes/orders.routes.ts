import express, {Router} from "express";
import {container} from "../inversify/inversify.ioc.config";
import OrderController from "../controller/OrderController";
import {IOC} from "../inversify/inversify.ioc.types";

const router = express.Router();

const controller = container.get<OrderController>(IOC.OrderController);

router.post("/", controller.createOrder.bind(controller));
router.get("/", controller.getOrders.bind(controller));
router.get("/:id", controller.getOrder.bind(controller));
router.delete("/:id", controller.deleteOrder.bind(controller));

export default router;