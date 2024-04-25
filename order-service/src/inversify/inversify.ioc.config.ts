import {Container} from "inversify";
import {IOC} from "./inversify.ioc.types"
import IOrderRepository from "../repository/IOrderRepository";
import OrderRepository from "../repository/implementation/OrderRepository";
import OrderService from "../service/OrderService";
import OrderServiceImpl from "../domain/service/OrderServiceImpl"
import OrderController from "../controller/OrderController";


const container = new Container();
container.bind<IOrderRepository>(IOC.OrderRepository).to(OrderRepository);
container.bind<OrderService>(IOC.OrderService).to(OrderServiceImpl);
container.bind(IOC.OrderController).to(OrderController);

export {container};