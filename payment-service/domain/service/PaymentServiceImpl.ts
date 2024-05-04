import PaymentService from "../../service/PaymentService";
import {inject, injectable} from "inversify";
import PaymentRequestDto from "../dto/PaymentRequestDto";
import PaymentResponseDto from "../dto/PaymentResponseDto";
import ProviderResponse from "../../thirdparty/ProviderResponse";
import {IOC} from "../../config/ioc/inversify.ioc.types";
import IPaymentRepository from "../../repository/IPaymentRepository";
import {plainToClass} from "class-transformer"
import {Payment} from "../model/Payment";
import IThirdPartyProvider from "../../thirdparty/Ithirdparty.provider";
import ProviderStrategy from "../../thirdparty/provider.strategy";
import ProviderRequest from "../../thirdparty/provider.request";

@injectable()
export default class PaymentServiceImpl implements PaymentService {

    private _paymentRepository: IPaymentRepository;
    private _providerStrategy: IThirdPartyProvider;

    constructor(
        @inject(IOC.PaymentRepository) paymentRepository: IPaymentRepository,
        @inject(IOC.ProviderStrategy) providerStrategy: IThirdPartyProvider) {
        this._paymentRepository = paymentRepository;
        this._providerStrategy = providerStrategy;
    }

    async makePayment(paymentRequestDto: PaymentRequestDto): Promise<void> {
        const payment = await this._paymentRepository.create(plainToClass(Payment, paymentRequestDto));

        const process: ProviderStrategy = await this._providerStrategy.getThirdPartyPaymentInstance(paymentRequestDto.paymentChannel);
        const providerRequest: ProviderRequest = plainToClass(ProviderRequest, payment, {excludeExtraneousValues: true});
        await process.strategy.processPayment(providerRequest);

        return Promise.resolve();
    }


    async completePayment(completePaymentRequestDto: ProviderResponse): Promise<PaymentResponseDto> {
        let payment: Payment | null = await this._paymentRepository.findOne(completePaymentRequestDto.processingNumber);
        if (payment) {
            const process: ProviderStrategy = await this._providerStrategy.getThirdPartyPaymentInstance(completePaymentRequestDto.paymentChannel);
            const paymentRes = await process.strategy.handlePaymentResponse(completePaymentRequestDto);

            return Promise.resolve(paymentRes);
        }
        throw Error("Wrong payment");
    }
}