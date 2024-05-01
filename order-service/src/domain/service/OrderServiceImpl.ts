import OrderService from "../../service/OrderService";
import {inject, injectable} from "inversify";
import OrderRequestDto from "../dto/OrderRequestDto";
import OrderResponseDto from "../dto/OrderResponseDto";
import {IOC} from "../inversify/inversify.ioc.types";
import IOrderRepository from "../../repository/IOrderRepository";
import {plainToClass} from "class-transformer"
import {Order} from "../model/Order";

@injectable()
export default class OrderServiceImpl implements OrderService {

    private _orderRepository: IOrderRepository;

    constructor(
        @inject(IOC.OrderRepository) orderRepository: IOrderRepository
    ) {
        this._orderRepository = orderRepository;
    }

    async createOrder(orderRequestDto: OrderRequestDto): Promise<OrderResponseDto> {
        return this._orderRepository.create(plainToClass(Order, orderRequestDto));
    }

    async deleteOrder(id: number): Promise<OrderResponseDto> {
        const order = await this._orderRepository.delete(id);
        return plainToClass(OrderResponseDto, order);
    }

    async getOrder(id: number): Promise<OrderResponseDto | null> {
        const order = await this._orderRepository.findOne(id);
        if(!order) return Promise.resolve(order);
        return plainToClass(OrderResponseDto, order);
    }

    async getOrders(): Promise<OrderResponseDto[] | []> {
        const orders = await this._orderRepository.find();
        return plainToClass(OrderResponseDto, orders);
    }

}