import {KafkaTopics} from "../config/constants/kafka.topics";

export default interface KafkaService{
    kafkaObserver(KAFKA_TOPIC: KafkaTopics): Promise<any>;
}