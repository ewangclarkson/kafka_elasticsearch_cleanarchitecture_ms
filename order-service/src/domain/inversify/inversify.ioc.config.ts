import {Container} from "inversify";
import {IOC} from "./inversify.ioc.types"
import ICartRepository from "../../repository/ICartRepository";
import CartRepository from "../../repository/implementation/CartRepository";
import CartService from "../../service/CartService";
import CartServiceImpl from "../service/CartServiceImpl"
import CartController from "../../controller/CartController";
import IOrderRepository from "../../repository/IOrderRepository";
import OrderRepository from "../../repository/implementation/OrderRepository";
import OrderService from "../../service/OrderService";
import OrderServiceImpl from "../service/OrderServiceImpl";
import OrderController from "../../controller/OrderController";


const container = new Container();
container.bind<ICartRepository>(IOC.CartRepository).to(CartRepository);
container.bind<CartService>(IOC.CartService).to(CartServiceImpl);

container.bind<IOrderRepository>(IOC.OrderRepository).to(OrderRepository);
container.bind<OrderService>(IOC.OrderService).to(OrderServiceImpl);

container.bind(IOC.OrderController).to(OrderController);
container.bind(IOC.CartController).to(CartController);

export {container};