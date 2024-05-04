import {PaymentChannel} from "../config/constants/payment.method";
import ProviderStrategy from "./provider.strategy";

export default interface IThirdPartyProvider {
    getThirdPartyPaymentInstance(channel: PaymentChannel): Promise<ProviderStrategy>;
}