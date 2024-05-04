import {PaymentChannel} from "../config/constants/payment.method";
import {Expose} from "class-transformer";

export default class ProviderRequest {
    @Expose()
    processingNumber!: string;
    @Expose()
    paymentChannel!: PaymentChannel;
    @Expose()
    transactionId!: string;
    @Expose()
    date!: string;
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
    cardNumber!: string;
    @Expose()
    expiryDate!: string;
    @Expose()
    cardPin!: string;
    @Expose()
    phoneNumber!: string;
    @Expose()
    amount!: string;

}