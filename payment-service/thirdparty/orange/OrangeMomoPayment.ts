import PaymentInterface from "../payment.interface";
import PaymentResponseDto from "../../domain/dto/PaymentResponseDto";
import IPaymentRepository from "../../repository/IPaymentRepository";
import {inject, injectable} from "inversify";
import {IOC} from "../../config/ioc/inversify.ioc.types";
import ProviderRequest from "../provider.request";
import ProviderResponse from "../ProviderResponse";
import {plainToClass} from "class-transformer";
import {KafkaTopics} from "../../config/constants/kafka.topics";
import KafkaPayload from "../../domain/dto/KafkaPayload";
import KafkaService from "../../service/KafkaService";

@injectable()
export default class OrangeMomoPayment implements PaymentInterface {
    private _paymentRepository: IPaymentRepository;
    private _kafkaService: KafkaService;

    constructor(
        @inject(IOC.PaymentRepository) paymentRepository: IPaymentRepository,
        @inject(IOC.KafkaService) kafkaService: KafkaService) {
        this._paymentRepository = paymentRepository;
        this._kafkaService = kafkaService;
    }

    async processPayment(paymentRequest: ProviderRequest): Promise<void> {
        console.log("Orange Payment success");
        return Promise.resolve();
    }

    async checkPaymentStatus(payStatusRequest: ProviderRequest): Promise<PaymentResponseDto> {
        return Promise.resolve(new PaymentResponseDto());
    }

    async handlePaymentResponse(paymentResponseDto: ProviderResponse): Promise<PaymentResponseDto> {

        let payment = await this._paymentRepository.findOne(paymentResponseDto.processingNumber);
        if (payment) {
            payment.paymentStatus = paymentResponseDto.paymentStatus;
            await this._paymentRepository.update(payment.id, payment);
            await this._kafkaService.kafkaRequest(KafkaTopics.ORDER_TOPIC, plainToClass(KafkaPayload, {
                payload: {
                    paymentStatus: paymentResponseDto.paymentStatus,
                    orderId: payment.orderId
                },
                correlationId: null,
                replyTo: null,
                incoming: KafkaTopics.PAYMENT_TOPIC
            }));
        }
        return Promise.resolve(plainToClass(PaymentResponseDto, payment, {excludeExtraneousValues: true}));
    }
}