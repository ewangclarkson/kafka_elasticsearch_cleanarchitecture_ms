import IOrderRepository from "../IOrderRepository";
import {Order} from "../../domain/model/Order";
import {injectable} from "inversify";
import {elasticClient} from "../../elasticsearch/elasticsearch";
import {ElasticIndices} from "../../config/constants/ElasticIndices";
import _ from "lodash";
import {plainToClass} from "class-transformer";
import {PaymentStatus} from "../../config/constants/payment.status";

@injectable()
export default class OrderRepository implements IOrderRepository {

    /**
     * There will be the need for another table to store the list of items bought
     * But this is ommitted at the moment since we are only dealing with a prove of concept
     * And not the actual full ecommerce implementation
     * @param order
     */

    async create(order: Order): Promise<Order> {

        order.orderStatus = PaymentStatus.PENDING;
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

        const orders = body.docs.map((document) => {
            return plainToClass(Order, _.omit(document, ['_source']));
        });

        return Promise.resolve(orders);
    }

    async update(id: string, order: Order): Promise<Order> {
        order = await Order.save(order);
        await elasticClient
            .update({
                index: ElasticIndices.ORDERS,
                id: id,
                doc: order
            });
        return Promise.resolve(order);
    }

}