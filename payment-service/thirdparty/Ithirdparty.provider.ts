import {PaymentChannel} from "../config/constants/payment.method";
import ProviderStrategy from "./provider.strategy";

export default interface IThirdPartyProvider {
    getThirdPartyPaymentProvider(channel: PaymentChannel): Promise<ProviderStrategy>;
}