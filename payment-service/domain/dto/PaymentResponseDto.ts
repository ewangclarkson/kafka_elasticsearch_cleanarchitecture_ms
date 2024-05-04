import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import PaymentRequestDto from "./PaymentRequestDto";

export default class PaymentResponseDto extends PaymentRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    id!: string;

    @IsString()
    @IsNotEmpty()
    transactionId!: string;

}