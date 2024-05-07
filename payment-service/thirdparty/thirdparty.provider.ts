import {PaymentChannel} from "../config/constants/payment.method";
import ProviderStrategy from "./provider.strategy";
import IThirdPartyProvider from "./Ithirdparty.provider";
import {inject, injectable} from "inversify";
import {IOC} from "../config/ioc/inversify.ioc.types";
import PaymentInterface from "./payment.interface";

@injectable()
export default class ThirdPartyProvider implements IThirdPartyProvider {

    private provider!: ProviderStrategy;
    private readonly mtnMomoPayment: PaymentInterface;
    private readonly orangePayment: PaymentInterface;
    private readonly visaPayment: PaymentInterface;

    constructor(
        @inject(IOC.MtnMomoPayment) momoPayment: PaymentInterface,
        @inject(IOC.OrangePayment) orangePayment: PaymentInterface,
        @inject(IOC.VisaPayment) visaPayment: PaymentInterface) {
        this.mtnMomoPayment = momoPayment;
        this.orangePayment = orangePayment;
        this.visaPayment = visaPayment;
    }


    async getThirdPartyPaymentProvider(channel: PaymentChannel): Promise<ProviderStrategy> {

        switch (channel) {
            case PaymentChannel.MTN_MOBILE_MONEY:
                this.provider = new ProviderStrategy(this.mtnMomoPayment);
                break;
            case PaymentChannel.ORANGE_MONEY:
                this.provider = new ProviderStrategy(this.orangePayment);
                break;
            case PaymentChannel.VISA_CARD:
                this.provider = new ProviderStrategy(this.visaPayment);
                break;
            default:
                this.provider = new ProviderStrategy(this.mtnMomoPayment);
                break;
        }

        return Promise.resolve(this.provider);
    }
}