import express, {Router} from "express";
import {container} from "../inversify/inversify.ioc.config";
import CartController from "../controller/CartController";
import {IOC} from "../inversify/inversify.ioc.types";
import 'express-async-errors';

const router = express.Router();

const controller = container.get<CartController>(IOC.CartController);

router.post("/", controller.addToCart.bind(controller));
router.get("/", controller.getCartDetails.bind(controller));
router.get("/:id", controller.getCartDetail.bind(controller));
router.delete("/:id", controller.deleteCartDetail.bind(controller));
router.put("/:id", controller.updateCart.bind(controller));

export default router;