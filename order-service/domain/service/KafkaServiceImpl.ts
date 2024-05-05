import {Consumer, EachMessagePayload, Kafka, Producer} from 'kafkajs';
import {KafkaTopics} from "../../config/constants/kafka.topics";
import config from "config";
import IOrderRepository from "../../repository/IOrderRepository";
import {IOC} from "../../inversify/inversify.ioc.types";
import {Order} from "../model/Order";
import KafkaService from "../../service/KafkaService";
import {inject, injectable} from "inversify";


@injectable()
export default class KafkaServiceImpl implements KafkaService {

    private kafka!: any;
    private _orderRepository: IOrderRepository;

    constructor(
        @inject(IOC.OrderRepository) orderRepository: IOrderRepository) {
        this.kafka = new Kafka({clientId: KafkaTopics.GROUP_ID, brokers: [config.get("kafka.brokers")]});
        this._orderRepository = orderRepository;
    }

    async kafkaObserver(KAFKA_TOPIC: KafkaTopics) {
        const producer: Producer = this.kafka.producer();
        const consumer: Consumer = this.kafka.consumer({groupId: KafkaTopics.GROUP_ID});

        await producer.connect();
        await consumer.connect();

        await consumer.subscribe({topic: KAFKA_TOPIC});

        await consumer.run({
            eachMessage: async ({topic, partition, message}: EachMessagePayload) => {
                const request = JSON.parse(message.value?.toString() || '');
                if (request.correlationId) {
                    //perform db operation
                    const response = {
                        payload: ""
                    };
                    await producer.send({
                        topic: request.replyTo,
                        messages: [{value: JSON.stringify(response)}],
                    });
                } else {
                    if (request.incoming === KafkaTopics.PAYMENT_TOPIC) {
                        const payload = request.data;
                        const order: Order | null = await this._orderRepository.findOne(payload.orderId);
                        if (order) {
                            order.orderStatus = payload.paymentStatus;
                            await this._orderRepository.update(order.id, order);
                        }
                    }
                }
            }
        });

    };
}
