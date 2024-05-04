import {IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";
import {PaymentChannel} from "../../config/constants/payment.method";
import {PaymentStatus} from "../../config/constants/payment.status";

export default class OrderRequestDto {
    @IsUUID('4')
    @IsNotEmpty()
    customerId!: string;
    @IsString()
    @IsNotEmpty()
    orderDate!: string;
    @IsString()
    @IsNotEmpty()
    shippingAddress!: string;
    @IsString()
    @IsNotEmpty()
    billingAddress!: string;
    @IsNumber()
    @IsNotEmpty()
    amount!: number;
    @IsEnum(PaymentChannel)
    @IsNotEmpty()
    paymentChannel!: PaymentChannel;
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    paymentStatus!: PaymentStatus;
}
