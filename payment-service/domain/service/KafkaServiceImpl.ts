import {Consumer, EachMessagePayload, Kafka, Producer} from 'kafkajs';
import {KafkaTopics} from "../../config/constants/kafka.topics";
import config from "config";
import KafkaService from "../../service/KafkaService";
import {injectable} from "inversify";
import KafkaPayload from "../dto/KafkaPayload";


@injectable()
export default class KafkaServiceImpl implements KafkaService {

    private kafka!: any;

    constructor() {
        this.kafka = new Kafka({clientId: KafkaTopics.GROUP_ID, brokers: [config.get("kafka.brokers")]});
    }

    async kafkaRequest(KAFKA_TOPIC: KafkaTopics, payload: KafkaPayload): Promise<any> {

        const producer: Producer = this.kafka.producer();
        await producer.connect();
        await producer.send(
            {
                topic: KAFKA_TOPIC,
                messages: [{value: JSON.stringify(payload)}]
            });
        await producer.disconnect();

        return (payload.correlationId ? (
                new Promise(async (resolve, reject) => {
                    const consumer: Consumer = this.kafka.consumer({groupId: KafkaTopics.GROUP_ID});
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
}
