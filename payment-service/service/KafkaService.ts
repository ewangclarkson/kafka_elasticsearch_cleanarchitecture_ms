import {KafkaTopics} from "../config/constants/kafka.topics";
import KafkaPayload from "../domain/dto/KafkaPayload";

export default interface KafkaService{
    kafkaRequest(KAFKA_TOPIC: KafkaTopics, payload: KafkaPayload): Promise<any>;
}