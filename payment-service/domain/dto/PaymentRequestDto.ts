import {PaymentChannel} from "../../config/constants/payment.method";
import {IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

export default class PaymentRequestDto {
    @IsEnum(PaymentChannel)
    paymentChannel!: PaymentChannel;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    cardNumber!: string;

    @IsString()
    expiryDate!: string;

    @IsNumber()
    cardPin!: number;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsNumber()
    @IsNotEmpty()
    amount!: string;

    @IsUUID('4')
    @IsNotEmpty()
    orderId!: string;
}
