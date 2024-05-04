import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {PaymentChannel} from "../config/constants/payment.method";
import {PaymentStatus} from "../config/constants/payment.status";

export default class ProviderResponse {
    @IsEnum(PaymentChannel)
    @IsNotEmpty()
    paymentChannel!: PaymentChannel;

    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    paymentStatus!: PaymentStatus;

    @IsString()
    @IsNotEmpty()
    transactionId!: string;

    @IsString()
    @IsNotEmpty()
    processingNumber!: string;
}
