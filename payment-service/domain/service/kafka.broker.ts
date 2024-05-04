import {Consumer, EachMessagePayload, Kafka, Producer} from 'kafkajs';
import {KafkaTopics} from "../../config/constants/kafka.topics";
import config from "config";
import KafkaPayload from "../dto/KafkaPayload";

const kafka = new Kafka({
    clientId: KafkaTopics.GROUP_ID,
    brokers: [config.get("kafka.brokers")],
});

export const KAFKARequest = async (KAFKA_TOPIC: KafkaTopics, payload: KafkaPayload): Promise<any> => {

    const producer: Producer = kafka.producer();
    await producer.connect();
    await producer.send(
        {
            topic: KAFKA_TOPIC,
            messages: [{value: JSON.stringify(payload)}]
        });
    await producer.disconnect();

    return (payload.correlationId ? (
            new Promise(async (resolve, reject) => {
                const consumer: Consumer = kafka.consumer({groupId: KafkaTopics.GROUP_ID});
                await consumer.connect();
                await consumer.subscribe({topic: payload.replyTo});

                await consumer.run({
                    eachMessage: async ({message}: EachMessagePayload) => {
                        const response = JSON.parse(message.value?.toString() || '');
                        if (response.correlationId) {
                            (response.correlationId === payload.correlationId)
                                ? resolve(response.data)
                                : reject("Failed to get data");
                        } else {
                            reject("Failed to get data");
                        }
                    },
                });
                await consumer.disconnect();
            }))
        : Promise.resolve(null));
};