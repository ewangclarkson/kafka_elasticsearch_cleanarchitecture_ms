import IOrderRepository from "../IOrderRepository";
import {Order} from "../../domain/model/Order";
import {injectable} from "inversify";
import {elasticClient} from "../../elasticsearch/elasticsearch";
import {ElasticIndices} from "../../config/constants/ElasticIndices";
import _ from "lodash";
import {plainToClass} from "class-transformer";
import {Cart} from "../../domain/model/Cart";

@injectable()
export default class OrderRepository implements IOrderRepository {


    async create(order: Order): Promise<Order> {

        order = await Order.save(order);

        // add the data to elastic search
        await elasticClient
            .index({
                index: ElasticIndices.ORDERS,
                id: order.id,
                document: order
            });

        return Promise.resolve(order);
    }

    async delete(id: string): Promise<Order> {
        const order = await Order.findOneById(id);

        await Order.delete(id);
        await elasticClient
            .delete({
                id: id,
                index: ElasticIndices.ORDERS,
            });

        return Promise.resolve(order!);
    }

    async findOne(id: string): Promise<Order | null> {
        const order = await elasticClient
            .get<Order>({
                id: id,
                index: ElasticIndices.ORDERS,
            });

        return Promise.resolve(order._source!);

    }

    async find(): Promise<Order[]> {

        const body = await elasticClient
            .mget<Order>({
                index: ElasticIndices.ORDERS,
                body: {
                    docs: [{_id: '_all'}],
                },
            });

        const orders= body.docs.map((document) => {
            return plainToClass(Order, _.omit(document,['_source']));
        });

        return Promise.resolve(orders);
    }

}