import IOrderRepository from "../IOrderRepository";
import {Order} from "../../domain/model/Order";
import {inject, injectable} from "inversify";
import _ from "lodash"


@injectable()
export default class OrderRepository implements IOrderRepository {


    async create(product: Order): Promise<Order> {

        return Promise.resolve(new Order());
    }

    async delete(id: number): Promise<Order> {

        return Promise.resolve(new Order());
    }

    async findOne(id: number): Promise<Order | null> {

        return Promise.resolve(new Order());

    }

    async find(): Promise<Order[]> {
        return Promise.resolve([new Order()]);
    }

}