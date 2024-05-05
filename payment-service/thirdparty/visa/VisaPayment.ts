import PaymentInterface from "../payment.interface";
import PaymentResponseDto from "../../domain/dto/PaymentResponseDto";
import IPaymentRepository from "../../repository/IPaymentRepository";
import {inject, injectable} from "inversify";
import {IOC} from "../../config/ioc/inversify.ioc.types";
import ProviderRequest from "../provider.request";
import ProviderResponse from "../ProviderResponse";
import {plainToClass} from "class-transformer";
import {KAFKARequest} from "../../domain/service/kafka.broker";
import {KafkaTopics} from "../../config/constants/kafka.topics";
import KafkaPayload from "../../domain/dto/KafkaPayload";

@injectable()
export default class VisaPayment implements PaymentInterface {
    private _paymentRepository: IPaymentRepository;

    constructor(@inject(IOC.PaymentRepository) paymentRepository: IPaymentRepository) {
        this._paymentRepository = paymentRepository;
    }

    async processPayment(paymentRequest: ProviderRequest): Promise<void> {
        console.log("Visa Payment success");
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
            await KAFKARequest(KafkaTopics.ORDER_TOPIC, plainToClass(KafkaPayload, {
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