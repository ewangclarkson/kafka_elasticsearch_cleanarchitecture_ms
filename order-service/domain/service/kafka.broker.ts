import {Consumer, EachMessagePayload, Kafka, Producer} from 'kafkajs';
import {KafkaTopics} from "../../config/constants/kafka.topics";
import config from "config";
import IOrderRepository from "../../repository/IOrderRepository";
import {container} from "../../inversify/inversify.ioc.config";
import {IOC} from "../../inversify/inversify.ioc.types";
import {Order} from "../model/Order";


const kafka = new Kafka({
    clientId: KafkaTopics.GROUP_ID,
    brokers: [config.get("kafka.brokers")],
});


export const KAFKAObserver = async (KAFKA_TOPIC: KafkaTopics) => {
    const producer: Producer = kafka.producer();
    const consumer: Consumer = kafka.consumer({groupId: KafkaTopics.GROUP_ID});

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
                    const orderRepository = container.get<IOrderRepository>(IOC.OrderRepository);
                    const order: Order | null = await orderRepository.findOne(payload.orderId);
                    if (order) {
                        order.paymentStatus = payload.paymentStatus;
                        await orderRepository.update(order.id, order);
                    }
                }
            }
        }
    });

};
