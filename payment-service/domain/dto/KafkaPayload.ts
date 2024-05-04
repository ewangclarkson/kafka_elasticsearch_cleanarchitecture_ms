import {PaymentChannel} from "../../config/constants/payment.method";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";

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
    @IsNotEmpty()
    cardNumber!: string;

    @IsString()
    @IsNotEmpty()
    expiryDate!: string;

    @IsNumber()
    @IsNotEmpty()
    cardPin!: number;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsNumber()
    @IsNotEmpty()
    amount!: string;

    @IsNumber()
    @IsNotEmpty()
    orderId!: string;
}
