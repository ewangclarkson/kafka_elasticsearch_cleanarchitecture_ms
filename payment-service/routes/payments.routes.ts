import express from "express";
import {container} from "../config/ioc/inversify.ioc.config";
import PaymentController from "../controller/PaymentController";
import {IOC} from "../config/ioc/inversify.ioc.types";
import 'express-async-errors';

const router = express.Router();

const controller = container.get<PaymentController>(IOC.PaymentController);

router.post("/make", controller.makePayment.bind(controller));
router.post("/complete", controller.completePayment.bind(controller));

export default router;