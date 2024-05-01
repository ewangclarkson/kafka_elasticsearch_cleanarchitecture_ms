import {Request, Response, NextFunction} from "express";
import OrderResponseDto from "../domain/dto/OrderResponseDto";
import {RequestValidator} from "../utils/RequestValidator"
import OrderRequestDto from "../domain/dto/OrderRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import {IOC} from "../domain/inversify/inversify.ioc.types";
import OrderService from "../service/OrderService";


@injectable()
export default class OrderController {

    private _orderService: OrderService;

    constructor(
        @inject(IOC.OrderService) orderService: OrderService
    ) {
        this._orderService = orderService;
    }

    async createOrder(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(OrderRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const order: OrderResponseDto = await this._orderService.createOrder(input);

        return response.status(HttpStatus.CREATED).send(order);
    }


    async getOrder(request: Request, response: Response, next: NextFunction) {
        const order = await this._orderService.getOrder(parseInt(request.params.id));
        if (!order) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        return response.status(HttpStatus.OK).send(order);
    }

    async getOrders(request: Request, response: Response, next: NextFunction) {

        const orders: OrderResponseDto[] = await this._orderService.getOrders();
        return response.status(HttpStatus.OK).send(orders);
    }

    async deleteOrder(request: Request, response: Response, next: NextFunction) {
        const order = await this._orderService.getOrder(parseInt(request.params.id));
        if (!order) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        await this._orderService.deleteOrder(parseInt(request.params.id));

        return response.status(HttpStatus.OK).send(order);
    }
}